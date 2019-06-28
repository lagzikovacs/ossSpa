import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MeService} from '../me.service';
import {ZoomSources} from '../../../enums/zoomsources';
import {CikkService} from '../../../cikk/cikk.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {CikkSzerkesztesMode} from '../../../cikk/cikkszerkesztesmode';
import {BizonylatService} from '../../../bizonylat/bizonylat.service';
import {BizonylattetelSzerkesztesMode} from '../../../bizonylat/bizonylattetelszerkesztesmode';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {TablaComponent} from '../../../tools/tabla/tabla.component';

@Component({
  selector: 'app-me-list',
  templateUrl: './me-list.component.html'
})
export class MeListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla') tabla: TablaComponent;

  szurok = ['Mennyiségi egység'];
  mod = false;
  meservice: MeService;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _logonservice: LogonService,
              private _cikkservice: CikkService,
              private _bizonylatservice: BizonylatService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              meservice: MeService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.meservice = meservice;
  }

  ngOnInit() {
    if (this.meservice.zoom) {
      this.onKereses();
    }
  }

  onKereses() {
    this.meservice.elsokereses = true;
    this.meservice.ekDto.rekordtol = 0;

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.meservice.Read(this.meservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.meservice.elsokereses) {
          this.meservice.Dto = res.Result;
          this.meservice.elsokereses = false;
        } else {
          const buf = [...this.meservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.meservice.Dto = buf;
        }

        this.eppFrissit = false;

        if (this.meservice.zoom) {
          window.scrollTo(0, document.body.scrollHeight);
        }
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onStartzoom(i: number) {
    if (this.meservice.zoomsource === ZoomSources.Cikk) {
      this._cikkservice.DtoEdited.Mekod = this.meservice.Dto[i].Mekod;
      this._cikkservice.DtoEdited.Me = this.meservice.Dto[i].Me;
    }
    if (this.meservice.zoomsource === ZoomSources.Bizonylattetel) {
      this._bizonylatservice.TetelDtoEdited.Mekod = this.meservice.Dto[i].Mekod;
      this._bizonylatservice.TetelDtoEdited.Me = this.meservice.Dto[i].Me;
    }

    this.onStopzoom();
  }
  onStopzoom() {
    this.meservice.zoom = false;

    if (this.meservice.zoomsource === ZoomSources.Cikk) {
      this._cikkservice.SzerkesztesMode = CikkSzerkesztesMode.Blank;
    }
    if (this.meservice.zoomsource === ZoomSources.Bizonylattetel) {
      this._bizonylatservice.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;
    }
  }

  onId(i: number) {
    this.meservice.DtoSelectedIndex = i;
  }

  onUj() {
    this.tabla.ujtetelstart();
  }

  onUjkesz() {
    this.tabla.ujtetelstop();
  }

  onTorlesutan() {
    this.tabla.clearselections();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

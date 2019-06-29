import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FizetesimodService} from '../fizetesimod.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {ZoomSources} from '../../../enums/zoomsources';
import {KifizetesService} from '../../../kifizetes/kifizetes.service';
import {KifizetesSzerkesztesMode} from '../../../kifizetes/kifizetesszerkesztesmode';
import {BizonylatService} from '../../../bizonylat/bizonylat.service';
import {BizonylatSzerkesztesMode} from '../../../bizonylat/bizonylatszerkesztesmode';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {TablaComponent} from '../../../tools/tabla/tabla.component';

@Component({
  selector: 'app-fizetesimod-list',
  templateUrl: './fizetesimod-list.component.html'
})
export class FizetesimodListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla') tabla: TablaComponent;

  szurok = ['Fizetési mód'];
  mod = false;
  fizetesimodservice: FizetesimodService;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _logonservice: LogonService,
              private _bizonylatkifizetesservice: KifizetesService,
              private _bizonylatservice: BizonylatService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              fizetesimodservice: FizetesimodService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.fizetesimodservice = fizetesimodservice;
  }

  ngOnInit() {
    if (this.fizetesimodservice.zoom) {
      this.onKereses();
    }
  }

  onKereses() {
    this.fizetesimodservice.elsokereses = true;
    this.fizetesimodservice.ekDto.rekordtol = 0;

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.fizetesimodservice.Read(this.fizetesimodservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.fizetesimodservice.elsokereses) {
          this.fizetesimodservice.Dto = res.Result;
          this.fizetesimodservice.elsokereses = false;
        } else {
          const buf = [...this.fizetesimodservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.fizetesimodservice.Dto = buf;
        }

        this.eppFrissit = false;

        // if (this.fizetesimodservice.zoom) {
        //   window.scrollTo(0, document.body.scrollHeight);
        // }
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onStartzoom(i: number) {
    if (this.fizetesimodservice.zoomsource === ZoomSources.Bizonylatkifizetes) {
      this._bizonylatkifizetesservice.DtoEdited.Fizetesimodkod = this.fizetesimodservice.Dto[i].Fizetesimodkod;
      this._bizonylatkifizetesservice.DtoEdited.Fizetesimod = this.fizetesimodservice.Dto[i].Fizetesimod1;
    }
    if (this.fizetesimodservice.zoomsource === ZoomSources.Bizonylat) {
      this._bizonylatservice.ComplexDtoEdited.Dto.Fizetesimodkod = this.fizetesimodservice.Dto[i].Fizetesimodkod;
      this._bizonylatservice.ComplexDtoEdited.Dto.Fizetesimod = this.fizetesimodservice.Dto[i].Fizetesimod1;
    }

    this.onStopzoom();
  }
  onStopzoom() {
    this.fizetesimodservice.zoom = false;

    if (this.fizetesimodservice.zoomsource === ZoomSources.Bizonylatkifizetes) {
      this._bizonylatkifizetesservice.SzerkesztesMode = KifizetesSzerkesztesMode.Blank;
    }
    if (this.fizetesimodservice.zoomsource === ZoomSources.Bizonylat) {
      this._bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.List;
    }
  }

  onId(i: number) {
    this.fizetesimodservice.DtoSelectedIndex = i;
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

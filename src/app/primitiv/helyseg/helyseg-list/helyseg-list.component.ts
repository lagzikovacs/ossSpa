import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {HelysegService} from '../helyseg.service';
import {LogonService} from '../../../logon/logon.service';
import {UgyfelService} from '../../../ugyfel/ugyfel.service';
import {JogKod} from '../../../enums/jogkod';
import {ZoomSources} from '../../../enums/zoomsources';
import {UgyfelSzerkesztesMode} from '../../../ugyfel/ugyfelszerkesztesmode';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {TablaComponent} from '../../../tools/tabla/tabla.component';

@Component({
  selector: 'app-helyseg-list',
  templateUrl: './helyseg-list.component.html'
})
export class HelysegListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla') tabla: TablaComponent;

  szurok = ['Helységnév'];
  mod = false;
  helysegservice: HelysegService;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              helysegservice: HelysegService,
              private ugyfelservice: UgyfelService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.helysegservice = helysegservice;
  }

  ngOnInit() {
    if (this.helysegservice.zoom) {
      this.onKereses();
    }
  }

  onKereses() {
    this.helysegservice.elsokereses = true;
    this.helysegservice.ekDto.rekordtol = 0;

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.helysegservice.Read(this.helysegservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.helysegservice.elsokereses) {
          this.helysegservice.Dto = res.Result;
          this.helysegservice.elsokereses = false;
        } else {
          const buf = [...this.helysegservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.helysegservice.Dto = buf;
        }

        this.eppFrissit = false;

        // if (this.helysegservice.zoom) {
        //   window.scrollTo(0, document.body.scrollHeight);
        // }
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onStartzoom(i: number) {
    if (this.helysegservice.zoomsource === ZoomSources.Ugyfel) {
      this.ugyfelservice.DtoEdited.Helysegkod = this.helysegservice.Dto[i].Helysegkod;
      this.ugyfelservice.DtoEdited.Helysegnev = this.helysegservice.Dto[i].Helysegnev;

      this.onStopzoom();
    }
  }
  onStopzoom() {
    this.helysegservice.zoom = false;

    this.ugyfelservice.SzerkesztesMode = UgyfelSzerkesztesMode.Blank;
  }

  onId(i: number) {
    this.helysegservice.DtoSelectedIndex = i;
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

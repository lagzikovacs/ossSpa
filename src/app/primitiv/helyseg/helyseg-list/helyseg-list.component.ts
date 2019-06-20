import {Component, OnDestroy, OnInit} from '@angular/core';
import {HelysegService} from '../helyseg.service';
import {LogonService} from '../../../logon/logon.service';
import {UgyfelService} from '../../../ugyfel/ugyfel.service';
import {JogKod} from '../../../enums/jogkod';
import {HelysegContainerMode} from '../helysegcontainermode';
import {ZoomSources} from '../../../enums/zoomsources';
import {HelysegEgyMode} from '../helysegegymode';
import {UgyfelSzerkesztesMode} from '../../../ugyfel/ugyfelszerkesztesmode';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';

@Component({
  selector: 'app-helyseg-list',
  templateUrl: './helyseg-list.component.html'
})
export class HelysegListComponent implements OnInit, OnDestroy {
  szurok = ['Helység'];
  mod = false;
  ti = -1;

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

        if (this.helysegservice.zoom) {
          window.scrollTo(0, document.body.scrollHeight);
        }
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  selectforzoom(i: number) {
    if (this.helysegservice.zoomsource === ZoomSources.Ugyfel) {
      this.ugyfelservice.DtoEdited.Helysegkod = this.helysegservice.Dto[i].Helysegkod;
      this.ugyfelservice.DtoEdited.Helysegnev = this.helysegservice.Dto[i].Helysegnev;

      this.stopzoom();
    }
  }
  stopzoom() {
    this.helysegservice.zoom = false;

    this.ugyfelservice.SzerkesztesMode = UgyfelSzerkesztesMode.Blank;
  }

  setClickedRow(i: number) {
    this.helysegservice.DtoSelectedIndex = i;
    this.helysegservice.uj = false;
    this.helysegservice.ContainerMode = HelysegContainerMode.Egy;
    this.helysegservice.EgyMode = HelysegEgyMode.Reszletek;
  }

  uj() {
    this.eppFrissit = true;
    this.helysegservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.helysegservice.uj = true;
        this.helysegservice.DtoEdited = res.Result[0];
        this.helysegservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.helysegservice.ContainerMode = HelysegContainerMode.Uj;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

import {Component, OnDestroy} from '@angular/core';
import {UgyfelService} from '../ugyfel.service';
import {HelysegService} from '../../primitiv/helyseg/helyseg.service';
import {ZoomSources} from '../../enums/zoomsources';
import {HelysegZoomParameter} from '../../primitiv/helyseg/helysegzoomparameter';
import {UgyfelContainerMode} from '../ugyfelcontainermode';
import {UgyfelEgyMode} from '../ugyfelegymode';
import {UgyfelSzerkesztesMode} from '../ugyfelszerkesztesmode';
import {HelysegContainerMode} from '../../primitiv/helyseg/helysegcontainermode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-ugyfel-szerkesztes',
  templateUrl: './ugyfel-szerkesztes.component.html'
})
export class UgyfelSzerkesztesComponent implements OnDestroy {
  ugyfelservice: UgyfelService;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(ugyfelservice: UgyfelService,
              private _helysegservice: HelysegService,
              private _spinnerservice: SpinnerService,
              private _errorservice: ErrorService) {
    this.ugyfelservice = ugyfelservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    this._helysegservice.ZoomCheck(new HelysegZoomParameter(this.ugyfelservice.DtoEdited.Helysegkod || 0,
      this.ugyfelservice.DtoEdited.Helysegnev || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        if (this.ugyfelservice.uj) {
          return this.ugyfelservice.Add(this.ugyfelservice.DtoEdited);
        } else {
          return this.ugyfelservice.Update(this.ugyfelservice.DtoEdited);
        }
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        return this.ugyfelservice.Get(res1.Result);
      })
      .then(res2 => {
        if (res2.Error !== null) {
          throw res2.Error;
        }

        if (this.ugyfelservice.uj) {
          this.ugyfelservice.Dto.unshift(res2.Result[0]);
        } else {
          this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex] = res2.Result[0];
        }

        this.eppFrissit = false;
        this.navigal();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    if (this.ugyfelservice.uj) {
      this.ugyfelservice.ContainerMode = UgyfelContainerMode.List;
    } else {
      this.ugyfelservice.EgyMode = UgyfelEgyMode.Reszletek;
    }
  }
  HelysegZoom() {
    this._helysegservice.ekDto.minta = this.ugyfelservice.DtoEdited.Helysegnev || '';
    this._helysegservice.zoomsource = ZoomSources.Ugyfel;
    this._helysegservice.zoom = true;
    this._helysegservice.ContainerMode = HelysegContainerMode.List;

    this.ugyfelservice.SzerkesztesMode = UgyfelSzerkesztesMode.HelysegZoom;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

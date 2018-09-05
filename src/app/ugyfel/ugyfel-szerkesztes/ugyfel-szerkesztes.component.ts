import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {UgyfelService} from '../ugyfel.service';
import {HelysegService} from '../../helyseg/helyseg.service';
import {ZoomSources} from '../../enums/zoomsources';
import {HelysegZoomParameter} from '../../helyseg/helysegzoomparameter';
import {UgyfelContainerMode} from '../ugyfelcontainermode';
import {UgyfelEgyMode} from '../ugyfelegymode';
import {UgyfelSzerkesztesMode} from '../ugyfelszerkesztesmode';
import {HelysegContainerMode} from '../../helyseg/helysegcontainermode';

@Component({
  selector: 'app-ugyfel-szerkesztes',
  templateUrl: './ugyfel-szerkesztes.component.html',
  styleUrls: ['./ugyfel-szerkesztes.component.css']
})
export class UgyfelSzerkesztesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  ugyfelservice: UgyfelService;
  eppFrissit = false;

  constructor(ugyfelservice: UgyfelService,
              private _helysegservice: HelysegService) {
    this.ugyfelservice = ugyfelservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    this._helysegservice.ZoomCheck(new HelysegZoomParameter(this.ugyfelservice.DtoEdited.HELYSEGKOD || 0,
      this.ugyfelservice.DtoEdited.HELYSEGNEV || ''))
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
        this.errormodal.show(err);
        this.eppFrissit = false;
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
    this._helysegservice.ekDto.minta = this.ugyfelservice.DtoEdited.HELYSEGNEV || '';
    this._helysegservice.zoomsource = ZoomSources.Ugyfel;
    this._helysegservice.zoom = true;
    this._helysegservice.ContainerMode = HelysegContainerMode.List;

    this.ugyfelservice.SzerkesztesMode = UgyfelSzerkesztesMode.HelysegZoom;
  }
}

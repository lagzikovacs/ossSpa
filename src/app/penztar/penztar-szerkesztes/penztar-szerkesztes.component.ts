import {Component, ViewChild} from '@angular/core';
import {PenznemService} from '../../penznem/penznem.service';
import {PenznemZoomParameter} from '../../dtos/primitiv/penznem/penznemzoomparameter';
import {ZoomSources} from '../../enums/zoomsources';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {PenztarService} from '../penztar.service';
import {PenztarContainerMode} from '../penztarcontainermode';
import {PenztarEgyMode} from '../penztaregymode';
import {PenztarSzerkesztesMode} from '../penztarszerkesztesmode';

@Component({
  selector: 'app-penztar-szerkesztes',
  templateUrl: './penztar-szerkesztes.component.html',
  styleUrls: ['./penztar-szerkesztes.component.css']
})
export class PenztarSzerkesztesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  penztarservice: PenztarService;
  eppFrissit = false;

  constructor(penztarservice: PenztarService,
              private _penznemservice: PenznemService) {
    this.penztarservice = penztarservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    this._penznemservice.ZoomCheck(new PenznemZoomParameter(this.penztarservice.DtoEdited.PENZNEMKOD || 0,
      this.penztarservice.DtoEdited.PENZNEM || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        if (this.penztarservice.uj) {
          return this.penztarservice.Add(this.penztarservice.DtoEdited);
        } else {
          return this.penztarservice.Update(this.penztarservice.DtoEdited);
        }
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        return this.penztarservice.Get(res1.Result);
      })
      .then(res2 => {
        if (res2.Error !== null) {
          throw res2.Error;
        }

        if (this.penztarservice.uj) {
          this.penztarservice.Dto.unshift(res2.Result[0]);
        } else {
          this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex] = res2.Result[0];
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
    if (this.penztarservice.uj) {
      this.penztarservice.ContainerMode = PenztarContainerMode.List;
    } else {
      this.penztarservice.EgyMode = PenztarEgyMode.Reszletek;
    }
  }
  PenznemZoom() {
    this._penznemservice.ekDto.minta = this.penztarservice.DtoEdited.PENZNEM || '';
    this._penznemservice.zoomsource = ZoomSources.Penztar;
    this._penznemservice.zoom = true;

    this.penztarservice.SzerkesztesMode = PenztarSzerkesztesMode.PenznemZoom;
  }
}

import {Component, OnDestroy} from '@angular/core';
import {PenznemService} from '../../primitiv/penznem/penznem.service';
import {PenznemZoomParameter} from '../../primitiv/penznem/penznemzoomparameter';
import {ZoomSources} from '../../enums/zoomsources';
import {PenztarService} from '../penztar.service';
import {PenztarContainerMode} from '../penztarcontainermode';
import {PenztarEgyMode} from '../penztaregymode';
import {PenztarSzerkesztesMode} from '../penztarszerkesztesmode';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-penztar-szerkesztes',
  templateUrl: './penztar-szerkesztes.component.html'
})
export class PenztarSzerkesztesComponent implements OnDestroy {
  penztarservice: PenztarService;
  eppFrissit = false;

  constructor(penztarservice: PenztarService,
              private _penznemservice: PenznemService,
              private _errorservice: ErrorService) {
    this.penztarservice = penztarservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    this._penznemservice.ZoomCheck(new PenznemZoomParameter(this.penztarservice.DtoEdited.Penznemkod || 0,
      this.penztarservice.DtoEdited.Penznem || ''))
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
        this.eppFrissit = false;
        this._errorservice.Error = err;
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
    this._penznemservice.ekDto.minta = this.penztarservice.DtoEdited.Penznem || '';
    this._penznemservice.zoomsource = ZoomSources.Penztar;
    this._penznemservice.zoom = true;

    this.penztarservice.SzerkesztesMode = PenztarSzerkesztesMode.PenznemZoom;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

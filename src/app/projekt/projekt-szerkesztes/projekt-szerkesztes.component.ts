import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {ProjektService} from '../projekt.service';
import {UgyfelService} from '../../ugyfel/ugyfel.service';
import {PenznemService} from '../../primitiv/penznem/penznem.service';
import {ZoomSources} from '../../enums/zoomsources';
import {UgyfelContainerMode} from '../../ugyfel/ugyfelcontainermode';
import {PenznemContainerMode} from '../../primitiv/penznem/penznemcontainermode';
import {ProjektContainerMode} from '../projektcontainermode';
import {ProjektSzerkesztesMode} from '../projektszerkesztesmode';
import {ProjektEgyMode} from '../projektegymode';
import {UgyfelZoomParameter} from '../../ugyfel/ugyfelzoomparameter';
import {PenznemZoomParameter} from '../../primitiv/penznem/penznemzoomparameter';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-projekt-szerkesztes',
  templateUrl: './projekt-szerkesztes.component.html',
  animations: [rowanimation]
})
export class ProjektSzerkesztesComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektservice: ProjektService;
  eppFrissit = false;
  Keletkezett: any;

  constructor(private _ugyfelservice: UgyfelService,
              private _penznemservice: PenznemService,
              projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.eppFrissit = true;
    this._ugyfelservice.ZoomCheck(new UgyfelZoomParameter(this.projektservice.DtoEdited.Ugyfelkod || 0,
      this.projektservice.DtoEdited.Ugyfelnev || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        return this._penznemservice.ZoomCheck(new PenznemZoomParameter(this.projektservice.DtoEdited.Penznemkod || 0,
          this.projektservice.DtoEdited.Penznem || ''));
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        if (this.projektservice.uj) {
          return this.projektservice.Add(this.projektservice.DtoEdited);
        } else {
          return this.projektservice.Update(this.projektservice.DtoEdited);
        }
      })
      .then(res2 => {
        if (res2.Error !== null) {
          throw res2.Error;
        }

        return this.projektservice.Get(res2.Result);
      })
      .then(res3 => {
        if (res3.Error !== null) {
          throw res3.Error;
        }

        if (this.projektservice.uj) {
          this.projektservice.Dto.unshift(res3.Result[0]);
        } else {
          this.projektservice.Dto[this.projektservice.DtoSelectedIndex] = res3.Result[0];
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
    if (this.projektservice.uj) {
      this.projektservice.ContainerMode = ProjektContainerMode.List;
    } else {
      this.projektservice.EgyMode = ProjektEgyMode.Reszletek;
    }
  }

  UgyfelZoom() {
    this._ugyfelservice.szempont = 0;
    this._ugyfelservice.minta = this.projektservice.DtoEdited.Ugyfelnev || '';
    this._ugyfelservice.zoomsource = ZoomSources.Projekt;
    this._ugyfelservice.zoom = true;
    this._ugyfelservice.ContainerMode = UgyfelContainerMode.List;

    this.projektservice.SzerkesztesMode = ProjektSzerkesztesMode.UgyfelZoom;
  }
  PenznemZoom() {
    this._penznemservice.ekDto.minta = this.projektservice.DtoEdited.Penznem || '';
    this._penznemservice.zoomsource = ZoomSources.Projekt;
    this._penznemservice.zoom = true;
    this._penznemservice.ContainerMode = PenznemContainerMode.List;

    this.projektservice.SzerkesztesMode = ProjektSzerkesztesMode.PenznemZoom;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

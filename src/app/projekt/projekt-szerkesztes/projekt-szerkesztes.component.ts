import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {UgyfelService} from '../../ugyfel/ugyfel.service';
import {PenznemService} from '../../primitiv/penznem/penznem.service';
import {ZoomSources} from '../../enums/zoomsources';
import {ProjektContainerMode} from '../projektcontainermode';
import {ProjektSzerkesztesMode} from '../projektszerkesztesmode';
import {ProjektEgyMode} from '../projektegymode';
import {UgyfelZoomParameter} from '../../ugyfel/ugyfelzoomparameter';
import {PenznemZoomParameter} from '../../primitiv/penznem/penznemzoomparameter';
import {rowanimation} from '../../animation/rowAnimation';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-projekt-szerkesztes',
  templateUrl: './projekt-szerkesztes.component.html',
  animations: [rowanimation]
})
export class ProjektSzerkesztesComponent implements OnInit, OnDestroy {
  projektservice: ProjektService;
  Keletkezett: any;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _ugyfelservice: UgyfelService,
              private _penznemservice: PenznemService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
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
        this.eppFrissit = false;
        this._errorservice.Error = err;
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

    this.projektservice.SzerkesztesMode = ProjektSzerkesztesMode.UgyfelZoom;
  }
  PenznemZoom() {
    this._penznemservice.ekDto.minta = this.projektservice.DtoEdited.Penznem || '';
    this._penznemservice.zoomsource = ZoomSources.Projekt;
    this._penznemservice.zoom = true;

    this.projektservice.SzerkesztesMode = ProjektSzerkesztesMode.PenznemZoom;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

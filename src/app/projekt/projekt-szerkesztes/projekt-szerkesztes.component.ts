import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {UgyfelService} from '../../ugyfel/ugyfel.service';
import {PenznemService} from '../../primitiv/penznem/penznem.service';
import {ZoomSources} from '../../enums/zoomsources';
import {ProjektSzerkesztesMode} from '../projektszerkesztesmode';
import {UgyfelZoomParameter} from '../../ugyfel/ugyfelzoomparameter';
import {PenznemZoomParameter} from '../../primitiv/penznem/penznemzoomparameter';
import {rowanimation} from '../../animation/rowAnimation';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {deepCopy} from '../../tools/deepCopy';
import {propCopy} from '../../tools/propCopy';

@Component({
  selector: 'app-projekt-szerkesztes',
  templateUrl: './projekt-szerkesztes.component.html',
  animations: [rowanimation]
})
export class ProjektSzerkesztesComponent implements OnInit, OnDestroy {
  projektservice: ProjektService;
  Keletkezett: any;

  @Input() uj = false;
  @Output() eventSzerkeszteskesz = new EventEmitter<void>();

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
    if (this.uj) {
      this.eppFrissit = true;
      this.projektservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.projektservice.DtoEdited = res.Result[0];
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.projektservice.DtoEdited = deepCopy(this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);
    }
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

        if (this.uj) {
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

        if (this.uj) {
          this.projektservice.Dto.unshift(res3.Result[0]);
        } else {
          propCopy(res3.Result[0], this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);
        }

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  cancel() {
    this.eventSzerkeszteskesz.emit();
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

import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {PenznemService} from '../../primitiv/penznem/penznem.service';
import {PenznemZoomParameter} from '../../primitiv/penznem/penznemzoomparameter';
import {ZoomSources} from '../../enums/zoomsources';
import {PenztarService} from '../penztar.service';
import {PenztarSzerkesztesMode} from '../penztarszerkesztesmode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {deepCopy} from '../../tools/deepCopy';
import {propCopy} from '../../tools/propCopy';

@Component({
  selector: 'app-penztar-szerkesztes',
  templateUrl: './penztar-szerkesztes.component.html'
})
export class PenztarSzerkesztesComponent implements OnInit, OnDestroy {
  penztarservice: PenztarService;

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

  constructor(penztarservice: PenztarService,
              private _penznemservice: PenznemService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService) {
    this.penztarservice = penztarservice;
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.penztarservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.penztarservice.DtoEdited = res.Result[0];
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.penztarservice.DtoEdited = deepCopy(this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex]);
    }
  }

  onSubmit() {
    this.eppFrissit = true;
    this._penznemservice.ZoomCheck(new PenznemZoomParameter(this.penztarservice.DtoEdited.Penznemkod || 0,
      this.penztarservice.DtoEdited.Penznem || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        if (this.uj) {
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

        if (this.uj) {
          this.penztarservice.Dto.unshift(res2.Result[0]);
        } else {
          propCopy(res2.Result[0], this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex]);
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

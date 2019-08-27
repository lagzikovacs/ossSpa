import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UgyfelkapcsolatDto} from '../ugyfelkapcsolatdto';
import {UgyfelkapcsolatSzerkesztesMode} from '../ugyfelkapcsolatszerkesztesmode';
import {UgyfelService} from '../../ugyfel/ugyfel.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {UgyfelkapcsolatService} from '../ugyfelkapcsolat.service';
import {UgyfelDto} from '../../ugyfel/ugyfeldto';
import {UgyfelZoomParameter} from '../../ugyfel/ugyfelzoomparameter';
import {UgyfelkapcsolatGetParam} from '../ugyfelkapcsolatgetparam';
import {FromTo} from '../../enums/fromto';

@Component({
  selector: 'app-ugyfelkapcsolat-szerkesztes',
  templateUrl: './ugyfelkapcsolat-szerkesztes.component.html'
})
export class UgyfelkapcsolatSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() Ugyfelkod = -1;
  DtoEdited = new UgyfelkapcsolatDto();
  @Output() eventSzerkeszteskesz = new EventEmitter<UgyfelkapcsolatDto>();

  SzerkesztesMode = UgyfelkapcsolatSzerkesztesMode.Blank;

  eppFrissit = false;

  ugyfelkapcsolatservice: UgyfelkapcsolatService;

  constructor(private _ugyfelservice: UgyfelService,
              private _errorservice: ErrorService,
              ugyfelkapcsolatservice: UgyfelkapcsolatService) {
    this.ugyfelkapcsolatservice = ugyfelkapcsolatservice;
  }

  ngOnInit() {
    this.eppFrissit = true;
    this.ugyfelkapcsolatservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.DtoEdited = res.Result[0];
        this.DtoEdited.Fromugyfelkod = this.Ugyfelkod;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onSubmit() {
    this.eppFrissit = true;
    this._ugyfelservice.ZoomCheck(new UgyfelZoomParameter(this.DtoEdited.Tougyfelkod || 0,
      this.DtoEdited.Nev || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

          return this.ugyfelkapcsolatservice.Add(this.DtoEdited);
      })
      .then(res2 => {
        if (res2.Error !== null) {
          throw res2.Error;
        }

        return this.ugyfelkapcsolatservice.Get(new UgyfelkapcsolatGetParam(res2.Result, FromTo.ToleIndul));
      })
      .then(res3 => {
        if (res3.Error !== null) {
          throw res3.Error;
        }

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res3.Result[0]);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  cancel() {
    this.eventSzerkeszteskesz.emit(null);
  }

  UgyfelZoom() {
    this.SzerkesztesMode = UgyfelkapcsolatSzerkesztesMode.UgyfelZoom;
  }
  onUgyfelSelectzoom(Dto: UgyfelDto) {
    this.DtoEdited.Tougyfelkod = Dto.Ugyfelkod;
    this.DtoEdited.Nev = Dto.Nev;
    this.DtoEdited.Cim = Dto.Cim;
  }
  onUgyfelStopzoom() {
    this.SzerkesztesMode = UgyfelkapcsolatSzerkesztesMode.Blank;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

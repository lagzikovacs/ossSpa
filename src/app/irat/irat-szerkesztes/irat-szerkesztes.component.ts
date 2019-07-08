import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IratService} from '../irat.service';
import {IrattipusService} from '../../primitiv/irattipus/irattipus.service';
import * as moment from 'moment';
import {UgyfelService} from '../../ugyfel/ugyfel.service';
import {IratSzerkesztesMode} from '../iratszerkesztesmode';
import {IrattipusZoomParameter} from '../../primitiv/irattipus/irattipuszoomparameter';
import {EmptyResult} from '../../dtos/emptyresult';
import {UgyfelZoomParameter} from '../../ugyfel/ugyfelzoomparameter';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {deepCopy} from '../../tools/deepCopy';
import {propCopy} from '../../tools/propCopy';
import {IrattipusDto} from '../../primitiv/irattipus/irattipusdto';
import {UgyfelDto} from '../../ugyfel/ugyfeldto';
import {IratDto} from '../iratdto';

@Component({
  selector: 'app-irat-szerkesztes',
  templateUrl: './irat-szerkesztes.component.html'
})
export class IratSzerkesztesComponent implements OnInit, OnDestroy {
  Keletkezett: any;

  @Input() uj = false;
  DtoEdited = new IratDto();
  @Input() set DtoOriginal(value: IratDto) {
    this.DtoEdited = deepCopy(value);
    this.Keletkezett = moment(this.DtoEdited.Keletkezett).format('YYYY-MM-DD');
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<IratDto>();

  SzerkesztesMode = IratSzerkesztesMode.Blank;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  iratservice: IratService;

  constructor(private _irattipusservice: IrattipusService,
              private _ugyfelservice: UgyfelService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              iratservice: IratService) {
    this.iratservice = iratservice;
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.iratservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.DtoEdited = res.Result[0];
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });

      this.Keletkezett = moment().format('YYYY-MM-DD');
    }
  }

  onSubmit() {
    this.eppFrissit = true;

    this._irattipusservice.ZoomCheck(new IrattipusZoomParameter(this.DtoEdited.Irattipuskod,
      this.DtoEdited.Irattipus))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.DtoEdited.Ugyfelnev || '' !== '') {
          return this._ugyfelservice.ZoomCheck(new UgyfelZoomParameter(this.DtoEdited.Ugyfelkod,
            this.DtoEdited.Ugyfelnev));
        } else {
          return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
        }
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.DtoEdited.Keletkezett = moment(this.Keletkezett).toISOString(true);

        if (this.uj) {
          return this.iratservice.Add(this.DtoEdited);
        } else {
          return this.iratservice.Update(this.DtoEdited);
        }
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        return this.iratservice.Get(res2.Result);
      })
      .then(res3 => {
        if (res3.Error != null) {
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

  onCancel() {
    this.eventSzerkeszteskesz.emit(null);
  }

  IrattipusZoom() {
    this.SzerkesztesMode = IratSzerkesztesMode.IrattipusZoom;
  }
  onIrattipusSelectzoom(Dto: IrattipusDto) {
    this.DtoEdited.Irattipuskod = Dto.Irattipuskod;
    this.DtoEdited.Irattipus = Dto.Irattipus1;
  }
  onIrattipusStopzoom() {
    this.SzerkesztesMode = IratSzerkesztesMode.Blank;
  }

  UgyfelZoom() {
    this.SzerkesztesMode = IratSzerkesztesMode.UgyfelZoom;
  }
  onUgyfelSelectzoom(Dto: UgyfelDto) {
    this.DtoEdited.Ugyfelkod = Dto.Ugyfelkod;
    this.DtoEdited.Ugyfelnev = Dto.Nev;
    this.DtoEdited.Ugyfelcim = Dto.Cim;
  }
  onUgyfelStopzoom() {
    this.SzerkesztesMode = IratSzerkesztesMode.Blank;
  }
  UgyfelTorles() {
    this.DtoEdited.Ugyfelkod = null;
    this.DtoEdited.Ugyfelnev = null;
    this.DtoEdited.Ugyfelcim = null;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

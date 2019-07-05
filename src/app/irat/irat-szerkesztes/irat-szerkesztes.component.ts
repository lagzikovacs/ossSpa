import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IratService} from '../irat.service';
import {IrattipusService} from '../../primitiv/irattipus/irattipus.service';
import {ZoomSources} from '../../enums/zoomsources';
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

@Component({
  selector: 'app-irat-szerkesztes',
  templateUrl: './irat-szerkesztes.component.html'
})
export class IratSzerkesztesComponent implements OnInit, OnDestroy {
  iratservice: IratService;
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

          this.iratservice.DtoEdited = res.Result[0];
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });

      this.Keletkezett = moment().format('YYYY-MM-DD');
    } else {
      this.iratservice.DtoEdited = deepCopy(this.iratservice.Dto[this.iratservice.DtoSelectedIndex]);

      this.Keletkezett = moment(this.iratservice.DtoEdited.Keletkezett).format('YYYY-MM-DD');
    }
  }

  onSubmit() {
    this.eppFrissit = true;

    this._irattipusservice.ZoomCheck(new IrattipusZoomParameter(this.iratservice.DtoEdited.Irattipuskod,
      this.iratservice.DtoEdited.Irattipus))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.iratservice.DtoEdited.Ugyfelnev || '' !== '') {
          return this._ugyfelservice.ZoomCheck(new UgyfelZoomParameter(this.iratservice.DtoEdited.Ugyfelkod,
            this.iratservice.DtoEdited.Ugyfelnev));
        } else {
          return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
        }
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.iratservice.DtoEdited.Keletkezett = moment(this.Keletkezett).toISOString(true);

        if (this.uj) {
          return this.iratservice.Add(this.iratservice.DtoEdited);
        } else {
          return this.iratservice.Update(this.iratservice.DtoEdited);
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

        if (this.uj) {
          this.iratservice.Dto.unshift(res3.Result[0]);
        } else {
          propCopy(res3.Result[0], this.iratservice.Dto[this.iratservice.DtoSelectedIndex]);
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

  IrattipusZoom() {
    this.iratservice.SzerkesztesMode = IratSzerkesztesMode.IrattipusZoom;
  }
  onMeSelectzoom(Dto: IrattipusDto) {
    this.iratservice.DtoEdited.Irattipuskod = Dto.Irattipuskod;
    this.iratservice.DtoEdited.Irattipus = Dto.Irattipus1;
  }
  onMeStopzoom() {
    this.iratservice.SzerkesztesMode = IratSzerkesztesMode.Blank;
  }

  UgyfelZoom() {
    this._ugyfelservice.szempont = 0;
    this._ugyfelservice.minta = this.iratservice.DtoEdited.Ugyfelnev || '';
    this._ugyfelservice.zoomsource = ZoomSources.Irat;
    this._ugyfelservice.zoom = true;

    this.iratservice.SzerkesztesMode = IratSzerkesztesMode.UgyfelZoom;
  }
  UgyfelTorles() {
    this.iratservice.DtoEdited.Ugyfelkod = null;
    this.iratservice.DtoEdited.Ugyfelnev = null;
    this.iratservice.DtoEdited.Ugyfelcim = null;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

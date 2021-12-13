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
import {deepCopy} from '../../tools/deepCopy';
import {IrattipusDto} from '../../primitiv/irattipus/irattipusdto';
import {UgyfelDto} from '../../ugyfel/ugyfeldto';
import {IratDto} from '../iratdto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-irat-szerkesztes',
  templateUrl: './irat-szerkesztes.component.html'
})
export class IratSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new IratDto();
  @Input() set DtoOriginal(value: IratDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Input() enUgyfel = true;
  @Input() Ugyfelkod = null;
  @Output() eventSzerkeszteskesz = new EventEmitter<IratDto>();

  SzerkesztesMode = IratSzerkesztesMode.Blank;

  iratzoombox: any;

  form: FormGroup;
  eppFrissit = false;

  iratservice: IratService;

  constructor(private _irattipusservice: IrattipusService,
              private _ugyfelservice: UgyfelService,
              private _errorservice: ErrorService,
              private _fb: FormBuilder,
              iratservice: IratService) {
    this.iratservice = iratservice;

    this.form = this._fb.group({
      'irany': ['', [Validators.required]],
      'keletkezett': ['', [Validators.required]],
      'irattipus': ['', [Validators.required, Validators.maxLength(30)]],
      'ugyfelnev': ['', [Validators.required, Validators.maxLength(200)]],
      'ugyfelcim': [{value: '', disabled: true}, []],
      'kuldo': ['', [Validators.maxLength(100)]],
      'targy': ['', [Validators.maxLength(200)]],
    });
  }

  ngOnInit() {
    this.iratzoombox = document.getElementById('iratzoombox');

    if (this.uj) {
      this.eppFrissit = true;
      this.iratservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.DtoEdited = res.Result[0];
          this.DtoEdited.Ugyfelkod = this.Ugyfelkod;
          this.updateform();
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.updateform();
    }
  }

  updateform() {
    this.form.controls['irany'].setValue(this.DtoEdited.Irany);

    const formKeletkezett = moment(this.DtoEdited.Keletkezett).format('YYYY-MM-DD');
    this.form.controls['keletkezett'].setValue(formKeletkezett);

    this.form.controls['irattipus'].setValue(this.DtoEdited.Irattipus);
    this.form.controls['ugyfelnev'].setValue(this.DtoEdited.Ugyfelnev);
    this.form.controls['ugyfelcim'].setValue(this.DtoEdited.Ugyfelcim);
    this.form.controls['kuldo'].setValue(this.DtoEdited.Kuldo);
    this.form.controls['targy'].setValue(this.DtoEdited.Targy);
  }
  updatedto() {
    this.DtoEdited.Irany = this.form.value['irany'];

    const dtoKeletkezett = moment(this.form.value['keletkezett']).toISOString(true);
    this.DtoEdited.Keletkezett = dtoKeletkezett;

    this.DtoEdited.Irattipus = this.form.value['irattipus'];
    this.DtoEdited.Ugyfelnev = this.form.value['ugyfelnev'];
    this.DtoEdited.Ugyfelcim = this.form.value['ugyfelcim'];
    this.DtoEdited.Kuldo = this.form.value['kuldo'];
    this.DtoEdited.Targy = this.form.value['targy'];
  }

  onSubmit() {
    this.eppFrissit = true;
    this.updatedto();

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
    this.updatedto();
    this.SzerkesztesMode = IratSzerkesztesMode.IrattipusZoom;
    this.iratzoombox.style.display = 'block';
  }
  onIrattipusSelectzoom(Dto: IrattipusDto) {
    this.DtoEdited.Irattipuskod = Dto.Irattipuskod;
    this.DtoEdited.Irattipus = Dto.Irattipus1;
    this.updateform();
  }
  onIrattipusStopzoom() {
    this.SzerkesztesMode = IratSzerkesztesMode.Blank;
    this.iratzoombox.style.display = 'none';
  }

  UgyfelZoom() {
    this.updatedto();
    this.SzerkesztesMode = IratSzerkesztesMode.UgyfelZoom;
    this.iratzoombox.style.display = 'block';
  }
  onUgyfelSelectzoom(Dto: UgyfelDto) {
    this.DtoEdited.Ugyfelkod = Dto.Ugyfelkod;
    this.DtoEdited.Ugyfelnev = Dto.Nev;
    this.DtoEdited.Ugyfelcim = Dto.Cim;
    this.updateform();
  }
  onUgyfelStopzoom() {
    this.SzerkesztesMode = IratSzerkesztesMode.Blank;
    this.iratzoombox.style.display = 'none';
  }
  UgyfelTorles() {
    this.DtoEdited.Ugyfelkod = null;
    this.DtoEdited.Ugyfelnev = null;
    this.DtoEdited.Ugyfelcim = null;
    this.updateform();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

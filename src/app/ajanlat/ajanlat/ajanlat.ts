import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ProjektkapcsolatService} from '../../projektkapcsolat/projektkapcsolat.service';
import * as moment from 'moment';
import {AjanlatService} from '../ajanlat.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {ProjektKapcsolatDto} from '../../projektkapcsolat/projektkapcsolatdto';
import {AjanlatParam} from '../ajanlatparam';
import {AjanlatBuf} from '../ajanlatbuf';
import {deepCopy} from '../../common/deepCopy';
import {propCopy} from '../../common/propCopy';
import {AjanlatTablaComponent} from '../ajanlat-tabla/ajanlat-tabla.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-ajanlat',
  templateUrl: './ajanlat.html'
})
export class AjanlatComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: AjanlatTablaComponent;

  @Input() Projektkod = -1;
  @Output() eventAjanlatkesz = new EventEmitter<ProjektKapcsolatDto>();

  AjanlatParam = new AjanlatParam();
  ajanlatitemindex = -1;
  ajanlatitem = new AjanlatBuf();
  AjanlatErvenyes: any;

  eppFrissit = false;
  formFej: FormGroup;

  ajanlatservice: AjanlatService;
  projektkapcsolatservice: ProjektkapcsolatService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              ajanlatservice: AjanlatService,
              projektkapcsolatservice: ProjektkapcsolatService) {
    this.ajanlatservice = ajanlatservice;
    this.projektkapcsolatservice = projektkapcsolatservice;

    this.formFej = this._fb.group({
      'ervenyes': ['', [Validators.required]],
      'szuksaram': ['', [Validators.required, Validators.maxLength(20)]],
      'tajolas': ['', [Validators.required, Validators.maxLength(20)]],
      'termeles': [0, [Validators.required]],
      'megjegyzes': ['', [Validators.maxLength(200)]],
      'netto': [{value: 0, disabled: true}, []],
      'afa': [{value: 0, disabled: true}, []],
      'brutto': [{value: 0, disabled: true}, []],
    });
  }

  ngOnInit() {
    this.eppFrissit = true;
    this.ajanlatservice.CreateNew()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.AjanlatParam = res.Result;
        this.AjanlatErvenyes = moment(this.AjanlatParam.Ervenyes).format('YYYY-MM-DD');

        this.updateform();
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  updateform() {
    const formErvenyes = moment(this.AjanlatParam.Ervenyes).format('YYYY-MM-DD');
    this.formFej.controls['ervenyes'].setValue(formErvenyes);

    this.formFej.controls['szuksaram'].setValue(this.AjanlatParam.SzuksegesAramerosseg);
    this.formFej.controls['tajolas'].setValue(this.AjanlatParam.Tajolas);
    this.formFej.controls['termeles'].setValue(this.AjanlatParam.Termeles);
    this.formFej.controls['megjegyzes'].setValue(this.AjanlatParam.Megjegyzes);
    this.formFej.controls['netto'].setValue(this.AjanlatParam.Netto);
    this.formFej.controls['afa'].setValue(this.AjanlatParam.Afa);
    this.formFej.controls['brutto'].setValue(this.AjanlatParam.Brutto);
  }
  updatedto() {
    const dtoErvenyes = moment(this.formFej.value['ervenyes']).toISOString(true);
    this.AjanlatParam.Ervenyes = dtoErvenyes;

    this.AjanlatParam.SzuksegesAramerosseg = this.formFej.value['szuksaram'];
    this.AjanlatParam.Tajolas = this.formFej.value['tajolas'];
    this.AjanlatParam.Termeles = this.formFej.value['termeles'];
    this.AjanlatParam.Megjegyzes = this.formFej.value['megjegyzes'];
    this.AjanlatParam.Netto = this.formFej.value['netto'];
    this.AjanlatParam.Afa = this.formFej.value['afa'];
    this.AjanlatParam.Brutto = this.formFej.value['brutto'];
  }

  onId(i) {
    this.updatedto();
    this.ajanlatitemindex = i;
    this.ajanlatitem = deepCopy(this.AjanlatParam.AjanlatBuf[this.ajanlatitemindex]);
  }
  onTetelKesz(item: AjanlatBuf) {
    this.tabla.nem();

    if (item !== null) {
      this.eppFrissit = true;
      propCopy(item, this.AjanlatParam.AjanlatBuf[this.ajanlatitemindex]);
      this.ajanlatservice.AjanlatCalc(this.AjanlatParam)
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.AjanlatParam = res.Result;

          this.updateform();
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    }
  }

  onSubmit() {
    this.eppFrissit = true;
    this.updatedto();

    this.AjanlatParam.ProjektKod = this.Projektkod;
    this.AjanlatParam.Ervenyes = moment(this.AjanlatErvenyes).toISOString(true);
    this.ajanlatservice.AjanlatKeszites(this.AjanlatParam)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.projektkapcsolatservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.eppFrissit = false;
        this.eventAjanlatkesz.emit(res1.Result[0]);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onCancel() {
    this.eventAjanlatkesz.emit(null);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

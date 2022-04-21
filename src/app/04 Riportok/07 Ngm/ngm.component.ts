import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import {NgmService} from './ngm.service';
import {NGMParam} from './ngmparam';
import * as moment from 'moment';
import {NGMMode} from './ngmmode';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorService} from "../../common/errorbox/error.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ngm',
  templateUrl: './ngm.component.html'
})
export class NgmComponent implements OnInit, OnDestroy {
  vszktol = '2022-01-01';
  vszkig = '2022-12-31';

  np = new NGMParam();
  result = '';

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  ngmservice: NgmService;

  constructor(ngmservice: NgmService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              private _errorservice: ErrorService) {
    this.ngmservice = ngmservice;

    this.form = this._fb.group({
      'szktol': ['', []],
      'szkig': ['', []],
      'szsztol': ['', [Validators.maxLength(20)]],
      'szszig': ['', [Validators.maxLength(20)]]
    });
  }

  ngOnInit() {
    this.form.controls['szktol'].setValue(this.vszktol);
    this.form.controls['szkig'].setValue(this.vszkig);
  }

  szamlakelte() {
    this.np = new NGMParam();
    this.np.Mode = NGMMode.SzamlaKelte;
    this.np.SzamlaKelteTol = moment(this.form.value['szktol']).toISOString(true);
    this.np.SzamlaKelteIg = moment(this.form.value['szkig']).toISOString(true);

    this.adatszolgaltatas();
  }
  szamlaszam() {
    this.np = new NGMParam();
    this.np.Mode = NGMMode.SzamlaSzam;
    this.np.SzamlaSzamTol = this.form.value['szsztol'];
    this.np.SzamlaSzamIg = this.form.value['szszig'];

    this.adatszolgaltatas();
  }

  async adatszolgaltatas() {
    this.spinner = true;
    this.result = '';

    try {
      const res = await this.ngmservice.Adatszolgaltatas(this.np);
      if (res.Error != null) {
        throw res.Error;
      }

      this.result = res.Result;

      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

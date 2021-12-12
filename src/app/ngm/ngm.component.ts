import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgmService} from './ngm.service';
import {NGMParam} from './ngmparam';
import * as moment from 'moment';
import {NGMMode} from './ngmmode';
import {ErrorService} from '../tools/errorbox/error.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-ngm',
  templateUrl: './ngm.component.html'
})
export class NgmComponent implements OnInit, OnDestroy {
  vszktol = '2021-01-01';
  vszkig = '2021-12-31';

  np = new NGMParam();
  result = '';

  form: FormGroup;
  eppFrissit = false;

  ngmservice: NgmService;

  constructor(ngmservice: NgmService,
              private _fb: FormBuilder,
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

  adatszolgaltatas() {
    this.eppFrissit = true;
    this.result = '';
    this.ngmservice.Adatszolgaltatas(this.np)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.result = res.Result;

        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

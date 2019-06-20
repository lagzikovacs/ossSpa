import {Component, OnDestroy} from '@angular/core';
import {NgmService} from './ngm.service';
import {NGMParam} from './ngmparam';
import * as moment from 'moment';
import {NGMMode} from './ngmmode';
import {ErrorService} from '../tools/errorbox/error.service';
import {SpinnerService} from '../tools/spinner/spinner.service';

@Component({
  selector: 'app-ngm',
  templateUrl: './ngm.component.html'
})
export class NgmComponent implements OnDestroy {
  ngmservice: NgmService;

  szktol = '2018-01-01';
  szkig = '2018-12-31';
  szsztol = '';
  szszig = '';

  np = new NGMParam();
  result = '';

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(ngmservice: NgmService,
              private _spinnerservice: SpinnerService,
              private _errorservice: ErrorService) {
    this.ngmservice = ngmservice;
  }

  submit() {

  }

  szamlakelte() {
    this.np = new NGMParam();
    this.np.Mode = NGMMode.SzamlaKelte;
    this.np.SzamlaKelteTol = moment(this.szktol).toISOString(true);
    this.np.SzamlaKelteIg = moment(this.szkig).toISOString(true);

    this.adatszolgaltatas();
  }
  szamlaszam() {
    this.np = new NGMParam();
    this.np.Mode = NGMMode.SzamlaSzam;
    this.np.SzamlaSzamTol = this.szsztol;
    this.np.SzamlaSzamIg = this.szszig;

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

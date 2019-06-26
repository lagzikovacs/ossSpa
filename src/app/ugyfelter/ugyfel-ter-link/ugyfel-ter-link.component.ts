import {Component, OnDestroy, OnInit} from '@angular/core';
import {UgyfelterService} from '../ugyfelter.service';
import {UgyfelService} from '../../ugyfel/ugyfel.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-ugyfel-ter-link',
  templateUrl: './ugyfel-ter-link.component.html'
})
export class UgyfelTerLinkComponent implements OnInit, OnDestroy {
  link = '';
  kikuldesikodidopontja: any;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _ugyfelservice: UgyfelService,
              private _ugyfelterservice: UgyfelterService,
              private _spinnerservice: SpinnerService,
              private _errorservice: ErrorService) { }

  ngOnInit() {
    if (this._ugyfelservice.Dto[this._ugyfelservice.DtoSelectedIndex].Kikuldesikodidopontja !== null) {
      this.kikuldesidopontja();
      this._ugyfelterservice.GetLink(this._ugyfelservice.Dto[this._ugyfelservice.DtoSelectedIndex])
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.link = environment.OSSRef + res.Result;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.kikuldesikodidopontja = '';
      this.link = '';
    }
  }

  kikuldesidopontja() {
    this.kikuldesikodidopontja =
      moment(this._ugyfelservice.Dto[this._ugyfelservice.DtoSelectedIndex].Kikuldesikodidopontja).format('YYYY-MM-DD HH:mm:ss');
  }

  ugyfelterlink() {
    this.eppFrissit = true;
    this._ugyfelterservice.CreateNewLink(this._ugyfelservice.Dto[this._ugyfelservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.link = environment.OSSRef + res.Result;
        return this._ugyfelservice.Get(this._ugyfelservice.Dto[this._ugyfelservice.DtoSelectedIndex].Ugyfelkod);
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        this._ugyfelservice.Dto[this._ugyfelservice.DtoSelectedIndex] = res1.Result[0];
        this.kikuldesidopontja();
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

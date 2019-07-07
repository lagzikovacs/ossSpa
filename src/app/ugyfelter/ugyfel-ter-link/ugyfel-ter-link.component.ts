import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UgyfelterService} from '../ugyfelter.service';
import {UgyfelService} from '../../ugyfel/ugyfel.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {UgyfelDto} from '../../ugyfel/ugyfeldto';

@Component({
  selector: 'app-ugyfel-ter-link',
  templateUrl: './ugyfel-ter-link.component.html'
})
export class UgyfelTerLinkComponent implements OnInit, OnDestroy {
  @Input() Dto = new UgyfelDto();
  @Output() eventSzerkeszteskesz = new EventEmitter<UgyfelDto>();

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
    if (this.Dto.Kikuldesikodidopontja !== null) {
      this.kikuldesidopontja();
      this._ugyfelterservice.GetLink(this.Dto)
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
    this.kikuldesikodidopontja = moment(this.Dto.Kikuldesikodidopontja).format('YYYY-MM-DD HH:mm:ss');
  }

  ugyfelterlink() {
    this.eppFrissit = true;
    this._ugyfelterservice.CreateNewLink(this.Dto)
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.link = environment.OSSRef + res.Result;
        return this._ugyfelservice.Get(this.Dto.Ugyfelkod);
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        this.kikuldesidopontja();
        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res1.Result[0]);
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

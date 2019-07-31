import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ProjektkapcsolatService} from '../../projektkapcsolat/projektkapcsolat.service';
import * as moment from 'moment';
import {AjanlatService} from '../ajanlat.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {ProjektKapcsolatDto} from '../../projektkapcsolat/projektkapcsolatdto';
import {AjanlatParam} from '../ajanlatparam';
import {AjanlatBuf} from '../ajanlatbuf';
import {deepCopy} from '../../tools/deepCopy';
import {propCopy} from '../../tools/propCopy';
import {AjanlatTablaComponent} from '../ajanlat-tabla/ajanlat-tabla.component';

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

  ajanlatservice: AjanlatService;
  projektkapcsolatservice: ProjektkapcsolatService;
  spinnerservice: SpinnerService;

  constructor(private _errorservice: ErrorService,
              spinnerservice: SpinnerService,
              ajanlatservice: AjanlatService,
              projektkapcsolatservice: ProjektkapcsolatService) {
    this.ajanlatservice = ajanlatservice;
    this.projektkapcsolatservice = projektkapcsolatservice;
    this.spinnerservice = spinnerservice;
  }

  ngOnInit() {
    this.spinnerservice.eppFrissit = true;
    this.ajanlatservice.CreateNew()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.AjanlatParam = res.Result;
        this.AjanlatErvenyes = moment(this.AjanlatParam.Ervenyes).format('YYYY-MM-DD');

        this.spinnerservice.eppFrissit = false;
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onId(i) {
    this.ajanlatitemindex = i;
    this.ajanlatitem = deepCopy(this.AjanlatParam.AjanlatBuf[this.ajanlatitemindex]);
  }
  onTetelKesz(item: AjanlatBuf) {
    this.tabla.nem();

    if (item !== null) {
      this.spinnerservice.eppFrissit = true;
      propCopy(item, this.AjanlatParam.AjanlatBuf[this.ajanlatitemindex]);
      this.ajanlatservice.AjanlatCalc(this.AjanlatParam)
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.AjanlatParam = res.Result;
          this.spinnerservice.eppFrissit = false;
        })
        .catch(err => {
          this.spinnerservice.eppFrissit = false;
          this._errorservice.Error = err;
        });
    }
  }

  onSubmit() {
    this.spinnerservice.eppFrissit = true;

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

        this.spinnerservice.eppFrissit = false;
        this.eventAjanlatkesz.emit(res1.Result[0]);
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
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

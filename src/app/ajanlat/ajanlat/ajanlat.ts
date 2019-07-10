import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProjektkapcsolatService} from '../../projektkapcsolat/projektkapcsolat.service';
import {AjanlatSzerkesztesMode} from '../ajanlatszerkesztesmode';
import {AjanlatContainerMode} from '../ajanlatcontainermode';
import * as moment from 'moment';
import {AjanlatService} from '../ajanlat.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {ProjektKapcsolatDto} from '../../projektkapcsolat/projektkapcsolatdto';

@Component({
  selector: 'app-ajanlat',
  templateUrl: './ajanlat.html'
})
export class AjanlatComponent implements OnInit, OnDestroy {
  @Input() Projektkod = -1;
  @Output() eventAjanlatkesz = new EventEmitter<ProjektKapcsolatDto>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  ajanlatservice: AjanlatService;
  projektkapcsolatservice: ProjektkapcsolatService;

  constructor(private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              ajanlatservice: AjanlatService,
              projektkapcsolatservice: ProjektkapcsolatService) {
    this.ajanlatservice = ajanlatservice;
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  ngOnInit() {
    this.eppFrissit = true;
    this.ajanlatservice.CreateNew()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.ajanlatservice.AjanlatParam = res.Result;
        this.ajanlatservice.AjanlatErvenyes = moment(this.ajanlatservice.AjanlatParam.Ervenyes).format('YYYY-MM-DD');

        this.ajanlatservice.AjanlatContainerMode = AjanlatContainerMode.List;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  setClickedRow(i) {
    this.ajanlatservice.AjanlattetelIndex = i;
    this.ajanlatservice.AjanlatContainerMode = AjanlatContainerMode.Szerkesztes;
    this.ajanlatservice.AjanlatSzerkesztesMode = AjanlatSzerkesztesMode.Blank;
  }

  onSubmit() {
    this.eppFrissit = true;

    this.ajanlatservice.AjanlatParam.ProjektKod = this.Projektkod;
    this.ajanlatservice.AjanlatParam.Ervenyes = moment(this.ajanlatservice.AjanlatErvenyes).toISOString(true);
    this.ajanlatservice.AjanlatKeszites(this.ajanlatservice.AjanlatParam)
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

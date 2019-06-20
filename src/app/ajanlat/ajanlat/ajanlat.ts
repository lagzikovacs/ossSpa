import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjektkapcsolatService} from '../../projektkapcsolat/projektkapcsolat.service';
import {BizonylatesIratContainerMode} from '../../projektkapcsolat/bizonylatesiratcontainermode';
import {AjanlatSzerkesztesMode} from '../ajanlatszerkesztesmode';
import {AjanlatContainerMode} from '../ajanlatcontainermode';
import * as moment from 'moment';
import {AjanlatService} from '../ajanlat.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-ajanlat',
  templateUrl: './ajanlat.html'
})
export class AjanlatComponent implements OnInit, OnDestroy {
  ajanlatservice: AjanlatService;
  projektkapcsolatservice: ProjektkapcsolatService;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              ajanlatservice: AjanlatService,
              projektkapcsolatservice: ProjektkapcsolatService) {
    this.ajanlatservice = ajanlatservice;
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  ngOnInit() {
    this.ajanlatservice.AjanlatErvenyes = moment(this.ajanlatservice.AjanlatParam.Ervenyes).format('YYYY-MM-DD');
  }

  setClickedRow(i) {
    this.ajanlatservice.AjanlattetelIndex = i;
    this.ajanlatservice.AjanlatContainerMode = AjanlatContainerMode.Szerkesztes;
    this.ajanlatservice.AjanlatSzerkesztesMode = AjanlatSzerkesztesMode.Blank;
  }

  onSubmit() {
    this.eppFrissit = true;

    this.ajanlatservice.AjanlatParam.ProjektKod = this.ajanlatservice.ProjektKod;
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

        this.projektkapcsolatservice.Dto.unshift(res1.Result[0]);

        this.eppFrissit = false;
        this.navigal();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    this.projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.List;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

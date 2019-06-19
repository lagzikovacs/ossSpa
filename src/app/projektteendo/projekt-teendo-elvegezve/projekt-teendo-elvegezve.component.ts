import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {ProjektteendoService} from '../projektteendo.service';
import {ProjektteendoEgyMode} from '../projekttendoegymode';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-projekt-teendo-elvegezve',
  templateUrl: './projekt-teendo-elvegezve.component.html'
})
export class ProjektTeendoElvegezveComponent implements OnInit, OnDestroy {
  projektteendoservice: ProjektteendoService;
  eppFrissit = false;
  Elvegezve: any;

  constructor(projektteendoservice: ProjektteendoService,
              private _errorservice: ErrorService) {
    this.projektteendoservice = projektteendoservice;
  }

  ngOnInit() {
    this.Elvegezve = moment().format('YYYY-MM-DD');
  }

  onSubmit() {
    this.eppFrissit = true;

    this.projektteendoservice.DtoEdited.Elvegezve = moment(this.Elvegezve).toISOString(true);
    this.projektteendoservice.Update(this.projektteendoservice.DtoEdited)
    .then(res1 => {
      if (res1.Error !== null) {
        throw res1.Error;
      }

      return this.projektteendoservice.Get(res1.Result);
    })
    .then(res2 => {
      if (res2.Error !== null) {
        throw res2.Error;
      }

      this.projektteendoservice.Dto[this.projektteendoservice.DtoSelectedIndex] = res2.Result[0];

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
    this.projektteendoservice.EgyMode = ProjektteendoEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

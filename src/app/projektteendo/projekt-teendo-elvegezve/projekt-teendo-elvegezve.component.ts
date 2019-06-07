import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {ProjektteendoService} from '../projektteendo.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {ProjektteendoEgyMode} from '../projekttendoegymode';

@Component({
  selector: 'app-projekt-teendo-elvegezve',
  templateUrl: './projekt-teendo-elvegezve.component.html'
})
export class ProjektTeendoElvegezveComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektteendoservice: ProjektteendoService;
  eppFrissit = false;
  Elvegezve: any;

  constructor(projektteendoservice: ProjektteendoService) {
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
      this.errormodal.show(err);
      this.eppFrissit = false;
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

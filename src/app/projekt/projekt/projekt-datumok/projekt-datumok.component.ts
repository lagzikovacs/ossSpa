import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import * as moment from 'moment';
import {ProjektEgyMode} from '../projektegymode';

@Component({
  selector: 'app-projekt-datumok',
  templateUrl: './projekt-datumok.component.html',
  styleUrls: ['./projekt-datumok.component.css'],
})
export class ProjektDatumokComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektservice: ProjektService;
  eppFrissit = false;

  Keletkezett: any;
  Megrendelve: any;
  KivHat: any;

  constructor(projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  ngOnInit() {
    this.Keletkezett = moment(this.projektservice.DtoEdited.Keletkezett).format('YYYY-MM-DD');
    this.Megrendelve = moment(this.projektservice.DtoEdited.Megrendelve).format('YYYY-MM-DD');
    this.KivHat = moment(this.projektservice.DtoEdited.Kivitelezesihatarido).format('YYYY-MM-DD');
  }

  onSubmit() {
    this.projektservice.DtoEdited.Keletkezett = moment(this.Keletkezett).toISOString(true);
    this.projektservice.DtoEdited.Megrendelve = moment(this.Megrendelve).toISOString(true);
    this.projektservice.DtoEdited.Kivitelezesihatarido = moment(this.KivHat).toISOString(true);

    this.eppFrissit = true;
    this.projektservice.Update(this.projektservice.DtoEdited)
      .then(res2 => {
        if (res2.Error !== null) {
          throw res2.Error;
        }

        return this.projektservice.Get(res2.Result);
      })
      .then(res3 => {
        if (res3.Error !== null) {
          throw res3.Error;
        }

        this.projektservice.Dto[this.projektservice.DtoSelectedIndex] = res3.Result[0];

        this.eppFrissit = false;
        this.navigal();
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    this.projektservice.EgyMode = ProjektEgyMode.Reszletek;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

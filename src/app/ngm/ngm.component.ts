import {Component, ViewChild} from '@angular/core';
import {NgmService} from './ngm.service';
import {ErrormodalComponent} from '../errormodal/errormodal.component';
import {NGMParam} from './ngmparam';
import * as moment from 'moment';
import {NGMMode} from './ngmmode';

@Component({
  selector: 'app-ngm',
  templateUrl: './ngm.component.html',
  styleUrls: ['./ngm.component.css']
})
export class NgmComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  ngmservice: NgmService;
  eppFrissit = false;

  szktol = '2018-01-01';
  szkig = '2018-12-31';
  szsztol = '';
  szszig = '';

  np = new NGMParam();
  result = '';

  constructor(ngmservice: NgmService) {
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
    this.ngmservice.Adataszolgaltatas(this.np)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.result = res.Result;

        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
}

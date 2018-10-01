import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {LogonService} from '../../../logon/logon.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {BizonylatesIratContainerMode} from '../bizonylatesiratcontainermode';
import {UjajanlatSzerkesztesMode} from '../ujajanlatszerkesztesmode';
import {UjajanlatContainerMode} from '../ujajanlatcontainermode';
import * as moment from 'moment';

@Component({
  selector: 'app-projekt-bizonylatesirat-ujajanlat',
  templateUrl: './projekt-bizonylatesirat-ujajanlat.component.html',
  styleUrls: ['./projekt-bizonylatesirat-ujajanlat.component.css']
})
export class ProjektBizonylatesiratUjajanlatComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektkapcsolatservice: ProjektkapcsolatService;
  eppFrissit = false;

  constructor(private _logonservice: LogonService,
              projektkapcsolatservice: ProjektkapcsolatService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  ngOnInit() {
    this.projektkapcsolatservice.AjanlatErvenyes = moment(this.projektkapcsolatservice.AjanlatParam.Ervenyes).format('YYYY-MM-DD');
  }

  setClickedRow(i) {
    this.projektkapcsolatservice.AjanlattetelIndex = i;
    this.projektkapcsolatservice.AjanlatContainerMode = UjajanlatContainerMode.Szerkesztes;
    this.projektkapcsolatservice.AjanlatSzerkesztesMode = UjajanlatSzerkesztesMode.Blank;
  }

  onSubmit() {
    this.eppFrissit = true;
    this.projektkapcsolatservice.AjanlatParam.ProjektKod = this.projektkapcsolatservice.ProjektKod;
    console.log(this.projektkapcsolatservice.AjanlatParam.Ervenyes);
    console.log(this.projektkapcsolatservice.AjanlatErvenyes);
    this.projektkapcsolatservice.AjanlatParam.Ervenyes = moment(this.projektkapcsolatservice.AjanlatErvenyes).toISOString(true);
    console.log(this.projektkapcsolatservice.AjanlatParam.Ervenyes);
    this.projektkapcsolatservice.AjanlatKeszites(this.projektkapcsolatservice.AjanlatParam)
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
        this.errormodal.show(err);
      });
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    this.projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.List;
  }
}

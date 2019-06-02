import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProjektkapcsolatService} from '../../projektkapcsolat/projektkapcsolat.service';
import {LogonService} from '../../logon/logon.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {BizonylatesIratContainerMode} from '../../projektkapcsolat/bizonylatesiratcontainermode';
import {AjanlatSzerkesztesMode} from '../ajanlatszerkesztesmode';
import {AjanlatContainerMode} from '../ajanlatcontainermode';
import * as moment from 'moment';
import {AjanlatService} from '../ajanlat.service';

@Component({
  selector: 'app-ajanlat',
  templateUrl: './ajanlat.html',
  styleUrls: ['./ajanlat.css']
})
export class AjanlatComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  ajanlatservice: AjanlatService;
  projektkapcsolatservice: ProjektkapcsolatService;
  eppFrissit = false;

  constructor(private _logonservice: LogonService,
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
        this.errormodal.show(err);
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

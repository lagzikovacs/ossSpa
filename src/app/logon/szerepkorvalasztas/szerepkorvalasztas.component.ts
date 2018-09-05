import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {LogonService} from '../logon.service';
import {Router} from '@angular/router';
import {CsoportService} from '../../csoport/csoport.service';

@Component({
  selector: 'app-szerepkorvalasztas',
  templateUrl: './szerepkorvalasztas.component.html',
  styleUrls: ['./szerepkorvalasztas.component.css']
})
export class SzerepkorvalasztasComponent implements OnInit {
  @ViewChild(ErrormodalComponent) private errormodal: ErrormodalComponent;
  logonservice: LogonService;

  constructor(private _router: Router,
              logonservice: LogonService,
              private _csoportservice: CsoportService) {
    this.logonservice = logonservice;
  }

  ngOnInit() {
    this.logonservice.SzerepkorKivalasztva = false;
  }

  setClickedRow(i: number) {
    this.logonservice.SzerepkorValasztas(this.logonservice.lehetsegesszerepkorokDto[i].PARTICIOKOD,
      this.logonservice.lehetsegesszerepkorokDto[i].CSOPORTKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this._csoportservice.Jogaim();
      })
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.logonservice.Jogaim = res.Result;

        this.logonservice.SzerepkorKivalasztva = true;
        this._router.navigate(['/fooldal']);
      })
      .catch(err => {
        this.errormodal.show(err);
      });
  }
}

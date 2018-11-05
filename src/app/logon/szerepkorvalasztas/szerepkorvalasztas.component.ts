import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {LogonService} from '../logon.service';
import {Router} from '@angular/router';
import {CsoportService} from '../../csoport/csoport.service';
import {SessionService} from '../../session/session.service';
import {SessionDto} from "../../session/sessiondto";

@Component({
  selector: 'app-szerepkorvalasztas',
  templateUrl: './szerepkorvalasztas.component.html',
  styleUrls: ['./szerepkorvalasztas.component.css']
})
export class SzerepkorvalasztasComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) private errormodal: ErrormodalComponent;

  logonservice: LogonService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _csoportservice: CsoportService,
              private _sessionservice: SessionService,
              logonservice: LogonService) {
    this.logonservice = logonservice;
  }

  ngOnInit() {
    this._sessionservice.sessiondto = new SessionDto();
    this.logonservice.SzerepkorKivalasztva = false;
  }

  setClickedRow(i: number) {
    this.eppFrissit = true;
    this.logonservice.SzerepkorValasztas(this.logonservice.lehetsegesszerepkorokDto[i].PARTICIOKOD,
      this.logonservice.lehetsegesszerepkorokDto[i].CSOPORTKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this._csoportservice.Jogaim();
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.logonservice.Jogaim = res1.Result;

        return this._sessionservice.Get();
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        this._sessionservice.sessiondto = res2.Result[0];

        this.logonservice.SzerepkorKivalasztva = true;
        this.eppFrissit = false;
        this._router.navigate(['/fooldal']);
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

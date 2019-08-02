import {Component, OnDestroy, OnInit} from '@angular/core';
import {LogonService} from '../logon.service';
import {Router} from '@angular/router';
import {SessionService} from '../../session/session.service';
import {SessionDto} from '../../session/sessiondto';
import {StartupService} from '../../startup/startup.service';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-szerepkorvalasztas',
  templateUrl: './szerepkorvalasztas.component.html'
})
export class SzerepkorvalasztasComponent implements OnInit, OnDestroy {
  eppFrissit = false;

  logonservice: LogonService;

  constructor(private _router: Router,
              private _sessionservice: SessionService,
              private _startupservice: StartupService,
              private _errorservice: ErrorService,
              logonservice: LogonService) {
    this.logonservice = logonservice;
  }

  ngOnInit() {
    this._sessionservice.sessiondto = new SessionDto();
    this.logonservice.SzerepkorKivalasztva = false;
  }

  setClickedRow(i: number) {
    this.eppFrissit = true;

    this._startupservice.SzerepkorValasztas(this.logonservice.lehetsegesszerepkorokDto[i].Particiokod,
      this.logonservice.lehetsegesszerepkorokDto[i].Csoportkod)
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        this.eppFrissit = false;
        this._router.navigate(['/fooldal']);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

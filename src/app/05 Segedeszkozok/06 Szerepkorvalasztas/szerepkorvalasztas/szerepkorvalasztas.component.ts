import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {LogonService} from '../../05 Bejelentkezes/logon.service';
import {Router} from '@angular/router';
import {SessionService} from '../../../session/session.service';
import {SessionDto} from '../../../session/sessiondto';
import {StartupService} from '../../../startup/startup.service';
import {ErrorService} from '../../../common/errorbox/error.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-szerepkorvalasztas',
  templateUrl: './szerepkorvalasztas.component.html'
})
export class SzerepkorvalasztasComponent implements OnInit, OnDestroy {
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  logonservice: LogonService;

  constructor(private _router: Router,
              private _sessionservice: SessionService,
              private _startupservice: StartupService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              logonservice: LogonService) {
    this.logonservice = logonservice;
  }

  ngOnInit() {
    this._sessionservice.sessiondto = new SessionDto();
    this.logonservice.SzerepkorKivalasztva = false;
  }

  async setClickedRow(i: number) {
    this.spinner = true;
    try {
      const res2 = await this._startupservice.SzerepkorValasztas(this.logonservice.lehetsegesszerepkorokDto[i].Particiokod,
        this.logonservice.lehetsegesszerepkorokDto[i].Csoportkod);
      if (res2.Error != null) {
        throw res2.Error;
      }

      this.spinner = false;
      this._router.navigate(['/fooldal']);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

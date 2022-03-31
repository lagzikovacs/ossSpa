import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LogonService} from '../logon.service';
import {SessionService} from '../../session/session.service';
import {SessionDto} from '../../session/sessiondto';
import {StartupService} from '../../startup/startup.service';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bejelentkezes',
  templateUrl: './bejelentkezes.component.html'
})
export class BejelentkezesComponent implements OnInit, OnDestroy {
  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  constructor(private _router: Router,
              private _fb: FormBuilder,
              private _logonservice: LogonService,
              private _sessionservice: SessionService,
              private _startupservice: StartupService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef) {

    this.form = this._fb.group({
      'azonosito': ['', [Validators.required, Validators.maxLength(30)]],
      'jelszo': ['', [Validators.required, Validators.maxLength(30)]]
    });
  }

  ngOnInit() {
    this._logonservice.Sid = '';
    this._logonservice.Jogaim = new Array<any>();
    this._sessionservice.sessiondto = new SessionDto();
    this._logonservice.SzerepkorKivalasztva = false;
  }

  onSubmit() {
    this.spinner = true;
    const nincsBesorolva = 'Önt a rendszergazda még nem sorolta be egyetlen felhasználói csoportba sem!';

    this._logonservice.Bejelentkezes(this.form.value['azonosito'], this.form.value['jelszo'])
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this._logonservice.Sid = res.Result;
        return this._logonservice.Szerepkorok();
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this._logonservice.lehetsegesszerepkorokDto = res1.Result;
        switch (this._logonservice.lehetsegesszerepkorokDto.length) {
          case 0:
            throw nincsBesorolva;
          case 1:
            this._startupservice.SzerepkorValasztas(this._logonservice.lehetsegesszerepkorokDto[0].Particiokod,
              this._logonservice.lehetsegesszerepkorokDto[0].Csoportkod)
              .then(res4 => {
                if (res4.Error != null) {
                  throw res4.Error;
                }

                this.spinner = false;
                this._router.navigate(['/fooldal']);
              })
              .catch(err => {
                throw err;
              });
            break;
          default:
            this.spinner = false;
            this._router.navigate(['/szerepkorvalasztas']);
        }
      })
      .catch(err => {
        this.spinner = false;
        this._errorservice.Error = err;
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

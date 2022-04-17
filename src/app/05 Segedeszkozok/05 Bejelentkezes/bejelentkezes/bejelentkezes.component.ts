import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LogonService} from '../logon.service';
import {SessionService} from '../../../session/session.service';
import {SessionDto} from '../../../session/sessiondto';
import {StartupService} from '../../06 Szerepkorvalasztas/startup.service';
import {ErrorService} from '../../../common/errorbox/error.service';

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

  async onSubmit() {
    const nincsBesorolva = 'Önt a rendszergazda még nem sorolta be egyetlen felhasználói csoportba sem!';

    this.spinner = true;
    try {
      const res = await this._logonservice.Bejelentkezes(this.form.value['azonosito'], this.form.value['jelszo']);
      if (res.Error !== null) {
        throw res.Error;
      }

      this._logonservice.Sid = res.Result;
      const res1 = await this._logonservice.Szerepkorok();
      if (res1.Error != null) {
        throw res1.Error;
      }

      this._logonservice.lehetsegesszerepkorokDto = res1.Result;
      switch (this._logonservice.lehetsegesszerepkorokDto.length) {
        case 0:
          throw nincsBesorolva;
        case 1:
          try {
            await this._startupservice.SzerepkorValasztas(this._logonservice.lehetsegesszerepkorokDto[0].Particiokod,
              this._logonservice.lehetsegesszerepkorokDto[0].Csoportkod);

            this.spinner = false;
            this._router.navigate(['/fooldal']);
          } catch (err) {
            throw err;
          }
          break;
        default:
          this.spinner = false;
          this._router.navigate(['/szerepkorvalasztas']);
      }
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
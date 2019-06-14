import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {LogonService} from '../logon.service';
import {SessionService} from '../../session/session.service';
import {SessionDto} from '../../session/sessiondto';
import {StartupService} from '../../startup/startup.service';

@Component({
  selector: 'app-bejelentkezes',
  templateUrl: './bejelentkezes.component.html'
})
export class BejelentkezesComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) private errormodal: ErrormodalComponent;

  form: FormGroup;
  public eppFrissit = false;

  constructor(private _router: Router,
              private fb: FormBuilder,
              private _logonservice: LogonService,
              private _sessionservice: SessionService,
              private _startupservice: StartupService) {
  }

  ngOnInit() {
    this._logonservice.Sid = '';
    this._logonservice.Jogaim = new Array<any>();
    this._sessionservice.sessiondto = new SessionDto();
    this._logonservice.SzerepkorKivalasztva = false;

    this.form = this.fb.group({
      'azonosito': ['', Validators.required],
      'jelszo': ['', Validators.required]
    });
  }

  onSubmit() {
    this.eppFrissit = true;
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

                this.eppFrissit = false;
                this._router.navigate(['/fooldal']);
              })
              .catch(err => {
                this.eppFrissit = false;
                this.errormodal.show(err);
              });
            break;
          default:
            this._router.navigate(['/szerepkorvalasztas']);
        }
      })
      .catch(err => {
        console.log(err);

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

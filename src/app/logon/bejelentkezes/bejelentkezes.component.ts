import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {LogonService} from '../logon.service';
import {CsoportService} from '../../csoport/csoport.service';
import {SessionService} from '../../session/session.service';
import {SessionDto} from '../../session/sessiondto';

@Component({
  selector: 'app-bejelentkezes',
  templateUrl: './bejelentkezes.component.html',
  styleUrls: ['./bejelentkezes.component.css'],
})
export class BejelentkezesComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) private errormodal: ErrormodalComponent;

  form: FormGroup;
  public eppFrissit = false;

  constructor(private _router: Router,
              private fb: FormBuilder,
              private _logonservice: LogonService,
              private _csoportservice: CsoportService,
              private _sessionservice: SessionService) {
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
            this._logonservice.SzerepkorValasztas(this._logonservice.lehetsegesszerepkorokDto[0].Particiokod,
              this._logonservice.lehetsegesszerepkorokDto[0].Csoportkod)
              .then(res2 => {
                if (res2.Error != null) {
                  throw res2.Error;
                }

                return this._csoportservice.Jogaim();
              })
              .then(res3 => {
                if (res3.Error != null) {
                  throw res3.Error;
                }

                this._logonservice.Jogaim = res3.Result;

                return this._sessionservice.Get();
              })
              .then(res4 => {
                if (res4.Error != null) {
                  throw res4.Error;
                }

                this._sessionservice.sessiondto = res4.Result[0];

                this._logonservice.SzerepkorKivalasztva = true;
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

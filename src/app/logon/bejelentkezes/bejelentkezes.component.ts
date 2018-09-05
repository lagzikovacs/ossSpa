import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {LogonService} from '../logon.service';
import {CsoportService} from '../../csoport/csoport.service';

@Component({
  selector: 'app-bejelentkezes',
  templateUrl: './bejelentkezes.component.html',
  styleUrls: ['./bejelentkezes.component.css']
})
export class BejelentkezesComponent implements OnInit {
  form: FormGroup;

  public eppFrissit = false;
  @ViewChild(ErrormodalComponent) private errormodal: ErrormodalComponent;

  constructor(private _router: Router,
              private fb: FormBuilder,
              private _logonservice: LogonService,
              private _csoportservice: CsoportService) {
  }

  ngOnInit() {
    this._logonservice.Sid = '';
    this._logonservice.Jogaim = new Array<any>();
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
            return this._logonservice.SzerepkorValasztas(this._logonservice.lehetsegesszerepkorokDto[0].PARTICIOKOD,
              this._logonservice.lehetsegesszerepkorokDto[0].CSOPORTKOD);
          default:
            this._router.navigate(['/szerepkorvalasztas']);
        }
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        return this._csoportservice.Jogaim();
      })
    .then(res3 => {
        this._logonservice.Jogaim = res3.Result;

        this._logonservice.SzerepkorKivalasztva = true;
        this._router.navigate(['/fooldal']);
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}

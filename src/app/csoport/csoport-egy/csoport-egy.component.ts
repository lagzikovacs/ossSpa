import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {CsoportService} from '../csoport.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-csoport-egy',
  templateUrl: './csoport-egy.component.html',
  styleUrls: ['./csoport-egy.component.css']
})
export class CsoportEgyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  csoportservice: CsoportService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              csoportservice: CsoportService) {
    this.csoportservice = csoportservice;
  }

  vissza() {
    this._router.navigate(['../csoport-list'], {relativeTo: this._route});
  }
  reszletek() {
    this._router.navigate(['reszletek'], {relativeTo: this._route});
  }
  torles () {
    this._router.navigate(['torles'], {relativeTo: this._route});
  }
  modositas() {
    this.csoportservice.uj = false;
    this.csoportservice.DtoEdited = Object.assign({}, this.csoportservice.Dto[this.csoportservice.DtoSelectedIndex]);
    this._router.navigate(['szerkesztes'], {relativeTo: this._route});
  }
  felhasznalo() {
    this._router.navigate(['felhasznalo'], {relativeTo: this._route});
  }
  jog() {
    this._router.navigate(['jog'], {relativeTo: this._route});
  }
}

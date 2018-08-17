import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {CsoportService} from '../../../services/segedeszkosz/csoport.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-csoportegy',
  templateUrl: './csoportegy.component.html',
  styleUrls: ['./csoportegy.component.css']
})
export class CsoportegyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  csoportservice: CsoportService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              csoportservice: CsoportService) {
    this.csoportservice = csoportservice;
  }

  vissza() {
    this._router.navigate(['../csoport'], {relativeTo: this._route});
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

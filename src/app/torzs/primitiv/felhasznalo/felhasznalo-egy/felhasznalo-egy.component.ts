import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';
import {FelhasznaloService} from '../../../../services/torzs/primitiv/felhasznalo.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-felhasznalo-egy',
  templateUrl: './felhasznalo-egy.component.html',
  styleUrls: ['./felhasznalo-egy.component.css']
})
export class FelhasznaloEgyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  felhasznaloservice: FelhasznaloService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              felhasznaloservice: FelhasznaloService) {
    this.felhasznaloservice = felhasznaloservice;
  }

  vissza() {
    this._router.navigate(['../felhasznalo'], {relativeTo: this._route});
  }
  torles () {
    this._router.navigate(['torles'], {relativeTo: this._route});
  }
  modositas() {
    this.felhasznaloservice.uj = false;
    this.felhasznaloservice.DtoEdited = Object.assign({}, this.felhasznaloservice.Dto[this.felhasznaloservice.DtoSelectedIndex]);
    this._router.navigate(['szerkesztes'], {relativeTo: this._route});
  }
  jelszo() {
    this._router.navigate(['jelszo'], {relativeTo: this._route});
  }
}

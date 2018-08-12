import {Component, ViewChild} from '@angular/core';
import {CikkService} from '../../../services/torzs/cikk.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-cikkegy',
  templateUrl: './cikkegy.component.html',
  styleUrls: ['./cikkegy.component.css']
})
export class CikkegyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  cikkservice: CikkService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              cikkservice: CikkService) {
    this.cikkservice = cikkservice;
  }

  vissza() {
    this._router.navigate(['../cikk'], {relativeTo: this._route});
  }
  torles () {
    this._router.navigate(['torles'], {relativeTo: this._route});
  }
  modositas() {
    this.cikkservice.uj = false;
    this.cikkservice.DtoEdited = Object.assign({}, this.cikkservice.Dto[this.cikkservice.DtoSelectedIndex]);
    this._router.navigate(['szerkesztes'], {relativeTo: this._route});
  }
  beszerzes() {
    this.cikkservice.BeszerzesKivet = 0;
    this._router.navigate(['beszerzes'], {relativeTo: this._route});
  }
  kivet() {
    this.cikkservice.BeszerzesKivet = 1;
    this._router.navigate(['kivet'], {relativeTo: this._route});
  }
}

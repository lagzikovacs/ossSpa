import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';
import {MeService} from '../../../../services/torzs/primitiv/me.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-meegy',
  templateUrl: './meegy.component.html',
  styleUrls: ['./meegy.component.css']
})
export class MeegyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  meservice: MeService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              meservice: MeService) {
    this.meservice = meservice;
  }

  vissza() {
    this._router.navigate(['../me'], {relativeTo: this._route});
  }
  torles () {
    this._router.navigate(['torles'], {relativeTo: this._route});
  }
  modositas() {
    this.meservice.uj = false;
    this.meservice.DtoEdited = Object.assign({}, this.meservice.Dto[this.meservice.DtoSelectedIndex]);
    this._router.navigate(['szerkesztes'], {relativeTo: this._route});
  }
}

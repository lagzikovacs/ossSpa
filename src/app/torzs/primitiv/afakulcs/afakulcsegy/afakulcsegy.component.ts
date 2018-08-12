import {Component, ViewChild} from '@angular/core';
import {AfakulcsService} from '../../../../services/torzs/primitiv/afakulcs.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-afakulcsegy',
  templateUrl: './afakulcsegy.component.html',
  styleUrls: ['./afakulcsegy.component.css']
})
export class AfakulcsegyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  afakulcsservice: AfakulcsService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              afakulcsservice: AfakulcsService) {
    this.afakulcsservice = afakulcsservice;
  }

  vissza() {
    this._router.navigate(['../afakulcs'], {relativeTo: this._route});
  }
  torles () {
    this._router.navigate(['torles'], {relativeTo: this._route});
  }
  modositas() {
    this.afakulcsservice.uj = false;
    this.afakulcsservice.DtoEdited = Object.assign({}, this.afakulcsservice.Dto[this.afakulcsservice.DtoSelectedIndex]);
    this._router.navigate(['szerkesztes'], {relativeTo: this._route});
  }
}

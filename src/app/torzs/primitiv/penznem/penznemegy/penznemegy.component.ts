import {Component, ViewChild} from '@angular/core';
import {PenznemService} from '../../../../services/torzs/primitiv/penznem.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-penznemegy',
  templateUrl: './penznemegy.component.html',
  styleUrls: ['./penznemegy.component.css']
})
export class PenznemegyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  penznemservice: PenznemService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              penznemservice: PenznemService) {
    this.penznemservice = penznemservice;
  }

  vissza() {
    this._router.navigate(['../penznem'], {relativeTo: this._route});
  }
  torles () {
    this._router.navigate(['torles'], {relativeTo: this._route});
  }
  modositas() {
    this.penznemservice.uj = false;
    this.penznemservice.DtoEdited = Object.assign({}, this.penznemservice.Dto[this.penznemservice.DtoSelectedIndex]);
    this._router.navigate(['szerkesztes'], {relativeTo: this._route});
  }
}

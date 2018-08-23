import {Component, ViewChild} from '@angular/core';
import {IratService} from '../../../services/eszkoz/irat/irat.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-irategy',
  templateUrl: './irategy.component.html',
  styleUrls: ['./irategy.component.css']
})
export class IrategyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  iratservice: IratService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              iratservice: IratService) {
    this.iratservice = iratservice;
  }

  vissza() {
    this._router.navigate(['../irat'], {relativeTo: this._route});
  }
  reszletek() {
    this._router.navigate(['reszletek'], {relativeTo: this._route});
  }
  torles() {
    this._router.navigate(['torles'], {relativeTo: this._route});
  }
  modositas() {
    this.iratservice.uj = false;
    this.iratservice.DtoEdited = Object.assign({}, this.iratservice.Dto[this.iratservice.DtoSelectedIndex]);
    this._router.navigate(['szerkesztes'], {relativeTo: this._route});
  }
  dokumentum() {
    this._router.navigate(['dokumentum'], {relativeTo: this._route});
  }
}

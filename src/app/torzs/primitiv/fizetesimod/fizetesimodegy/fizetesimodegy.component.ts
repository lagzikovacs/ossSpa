import {Component, ViewChild} from '@angular/core';
import {FizetesimodService} from '../../../../services/torzs/primitiv/fizetesimod.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-fizetesimodegy',
  templateUrl: './fizetesimodegy.component.html',
  styleUrls: ['./fizetesimodegy.component.css']
})
export class FizetesimodegyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  fizetesimodservice: FizetesimodService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              fizetesimodservice: FizetesimodService) {
    this.fizetesimodservice = fizetesimodservice;
  }

  vissza() {
    this._router.navigate(['../fizetesimod'], {relativeTo: this._route});
  }
  torles () {
    this._router.navigate(['torles'], {relativeTo: this._route});
  }
  modositas() {
    this.fizetesimodservice.uj = false;
    this.fizetesimodservice.DtoEdited = Object.assign({}, this.fizetesimodservice.Dto[this.fizetesimodservice.DtoSelectedIndex]);
    this._router.navigate(['szerkesztes'], {relativeTo: this._route});
  }
}

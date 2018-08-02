import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';
import {IrattipusService} from '../../../../services/irattipus.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-irattipusegy',
  templateUrl: './irattipusegy.component.html',
  styleUrls: ['./irattipusegy.component.css']
})
export class IrattipusegyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  irattipusservice: IrattipusService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              irattipusservice: IrattipusService) {
    this.irattipusservice = irattipusservice;
  }

  vissza() {
    this._router.navigate(['../irattipus'], {relativeTo: this._route});
  }
  torles () {
    this._router.navigate(['torles'], {relativeTo: this._route});
  }
  modositas() {
    this.irattipusservice.uj = false;
    this.irattipusservice.DtoEdited = Object.assign({}, this.irattipusservice.Dto[this.irattipusservice.DtoSelectedIndex]);
    this._router.navigate(['szerkesztes'], {relativeTo: this._route});
  }
}

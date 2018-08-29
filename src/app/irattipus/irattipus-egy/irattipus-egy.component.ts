import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {IrattipusService} from '../irattipus.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LogonService} from '../../services/logon.service';
import {JogKod} from '../../enums/jogkod';

@Component({
  selector: 'app-irattipus-egy',
  templateUrl: './irattipus-egy.component.html',
  styleUrls: ['./irattipus-egy.component.css']
})
export class IrattipusEgyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  irattipusservice: IrattipusService;
  mod = false;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
              irattipusservice: IrattipusService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.irattipusservice = irattipusservice;
  }

  vissza() {
    this._router.navigate(['../irattipus-list'], {relativeTo: this._route});
  }
  reszletek() {
    this._router.navigate(['reszletek'], {relativeTo: this._route});
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

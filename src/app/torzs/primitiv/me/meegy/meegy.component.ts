import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';
import {MeService} from '../../../../services/torzs/primitiv/me.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LogonService} from "../../../../services/segedeszkosz/logon.service";
import {JogKod} from "../../../../enums/jogkod";

@Component({
  selector: 'app-meegy',
  templateUrl: './meegy.component.html',
  styleUrls: ['./meegy.component.css']
})
export class MeegyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  meservice: MeService;
  mod = false;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
              meservice: MeService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.meservice = meservice;
  }

  vissza() {
    this._router.navigate(['../me'], {relativeTo: this._route});
  }
  reszletek() {
    this._router.navigate(['reszletek'], {relativeTo: this._route});
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

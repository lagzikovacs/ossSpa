import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {UgyfelService} from '../../../services/torzs/ugyfel.service';
import {LogonService} from "../../../services/segedeszkosz/logon.service";
import {JogKod} from "../../../enums/jogkod";

@Component({
  selector: 'app-ugyfelegy',
  templateUrl: './ugyfelegy.component.html',
  styleUrls: ['./ugyfelegy.component.css']
})
export class UgyfelegyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  ugyfelservice: UgyfelService;
  mod = false;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
              ugyfelservice: UgyfelService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.UGYFELEKMOD]);
    this.ugyfelservice = ugyfelservice;
  }

  vissza() {
    this._router.navigate(['../ugyfel'], {relativeTo: this._route});
  }
  reszletek() {
    this._router.navigate(['reszletek'], {relativeTo: this._route});
  }
  torles() {
    this._router.navigate(['torles'], {relativeTo: this._route});
  }
  modositas() {
    this.ugyfelservice.uj = false;
    this.ugyfelservice.DtoEdited = Object.assign({}, this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex]);
    this._router.navigate(['szerkesztes'], {relativeTo: this._route});
  }
}

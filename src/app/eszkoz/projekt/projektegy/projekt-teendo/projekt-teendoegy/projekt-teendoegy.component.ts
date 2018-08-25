import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from "../../../../../tools/errormodal/errormodal.component";
import {LogonService} from "../../../../../services/segedeszkosz/logon.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjektteendoService} from "../../../../../services/eszkoz/projekt/projektteendo.service";

@Component({
  selector: 'app-projekt-teendoegy',
  templateUrl: './projekt-teendoegy.component.html',
  styleUrls: ['./projekt-teendoegy.component.css']
})
export class ProjektTeendoegyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektteendoservice: ProjektteendoService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
              projektteendoservice: ProjektteendoService) {
    this.projektteendoservice = projektteendoservice;
  }

  vissza() {
    this._router.navigate(['../projektteendo'], {relativeTo: this._route});
  }
  reszletek() {
    this._router.navigate(['reszletek'], {relativeTo: this._route});
  }
  torles () {
    this._router.navigate(['torles'], {relativeTo: this._route});
  }
  modositas() {
    this.projektteendoservice.uj = false;
    this.projektteendoservice.DtoEdited = Object.assign({}, this.projektteendoservice.Dto[this.projektteendoservice.DtoSelectedIndex]);
    this._router.navigate(['szerkesztes'], {relativeTo: this._route});
  }
  elvegezve() {
    this.projektteendoservice.uj = false;
    this.projektteendoservice.DtoEdited = Object.assign({}, this.projektteendoservice.Dto[this.projektteendoservice.DtoSelectedIndex]);
    this._router.navigate(['elvegezve'], {relativeTo: this._route});
  }
}

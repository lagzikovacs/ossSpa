import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';
import {TeendoService} from '../../../../services/torzs/primitiv/teendo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LogonService} from '../../../../services/segedeszkosz/logon.service';
import {JogKod} from '../../../../enums/jogkod';

@Component({
  selector: 'app-teendoegy',
  templateUrl: './teendoegy.component.html',
  styleUrls: ['./teendoegy.component.css']
})
export class TeendoegyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  teendoservice: TeendoService;
  mod = false;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
              teendoservice: TeendoService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.teendoservice = teendoservice;
  }

  vissza() {
    this._router.navigate(['../teendo'], {relativeTo: this._route});
  }
  reszletek() {
    this._router.navigate(['reszletek'], {relativeTo: this._route});
  }
  torles () {
    this._router.navigate(['torles'], {relativeTo: this._route});
  }
  modositas() {
    this.teendoservice.uj = false;
    this.teendoservice.DtoEdited = Object.assign({}, this.teendoservice.Dto[this.teendoservice.DtoSelectedIndex]);
    this._router.navigate(['szerkesztes'], {relativeTo: this._route});
  }
}

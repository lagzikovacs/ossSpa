import {Component, ViewChild} from '@angular/core';
import {PenztarService} from '../../../services/eszkoz/penztar.service';
import {LogonService} from '../../../services/segedeszkosz/logon.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {JogKod} from '../../../enums/jogkod';

@Component({
  selector: 'app-penztaregy',
  templateUrl: './penztaregy.component.html',
  styleUrls: ['./penztaregy.component.css']
})
export class PenztaregyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  penztarservice: PenztarService;
  mod = false;
  nyitva = false;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
              penztarservice: PenztarService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PENZTARMOD]);
    this.penztarservice = penztarservice;
    this.nyitva = this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex].NYITVA;
  }

  vissza() {
    this._router.navigate(['../penztar'], {relativeTo: this._route});
  }
  reszletek() {
    this._router.navigate(['reszletek'], {relativeTo: this._route});
  }
  torles () {
    this._router.navigate(['torles'], {relativeTo: this._route});
  }
  modositas() {
    this.penztarservice.uj = false;
    this.penztarservice.DtoEdited = Object.assign({}, this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex]);
    this._router.navigate(['szerkesztes'], {relativeTo: this._route});
  }
  tetelek() {
    this._router.navigate(['tetelek'], {relativeTo: this._route});
  }
  export() {
    this._router.navigate(['export'], {relativeTo: this._route});
  }
}

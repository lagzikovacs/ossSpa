import {Component, ViewChild} from '@angular/core';
import {TermekdijService} from '../../../../services/torzs/primitiv/termekdij.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';
import {LogonService} from "../../../../services/segedeszkosz/logon.service";
import {JogKod} from "../../../../enums/jogkod";

@Component({
  selector: 'app-termekdijegy',
  templateUrl: './termekdijegy.component.html',
  styleUrls: ['./termekdijegy.component.css']
})
export class TermekdijegyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  termekdijservice: TermekdijService;
  mod = false;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
              termekdijservice: TermekdijService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.termekdijservice = termekdijservice;
  }

  vissza() {
    this._router.navigate(['../termekdij'], {relativeTo: this._route});
  }
  reszletek() {
    this._router.navigate(['reszletek'], {relativeTo: this._route});
  }
  torles () {
    this._router.navigate(['torles'], {relativeTo: this._route});
  }
  modositas() {
    this.termekdijservice.uj = false;
    this.termekdijservice.DtoEdited = Object.assign({}, this.termekdijservice.Dto[this.termekdijservice.DtoSelectedIndex]);
    this._router.navigate(['szerkesztes'], {relativeTo: this._route});
  }
}

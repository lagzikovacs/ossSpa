import {Component, ViewChild} from '@angular/core';
import {PenznemService} from '../penznem.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {LogonService} from '../../services/logon.service';
import {JogKod} from '../../enums/jogkod';

@Component({
  selector: 'app-penznem-egy',
  templateUrl: './penznem-egy.component.html',
  styleUrls: ['./penznem-egy.component.css']
})
export class PenznemEgyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  penznemservice: PenznemService;
  mod = false;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
              penznemservice: PenznemService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.penznemservice = penznemservice;
  }

  vissza() {
    this._router.navigate(['../penznem-list'], {relativeTo: this._route});
  }
  reszletek() {
    this._router.navigate(['reszletek'], {relativeTo: this._route});
  }
  torles () {
    this._router.navigate(['torles'], {relativeTo: this._route});
  }
  modositas() {
    this.penznemservice.uj = false;
    this.penznemservice.DtoEdited = Object.assign({}, this.penznemservice.Dto[this.penznemservice.DtoSelectedIndex]);
    this._router.navigate(['szerkesztes'], {relativeTo: this._route});
  }
}

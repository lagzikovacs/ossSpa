import {Component, ViewChild} from '@angular/core';
import {FizetesimodService} from '../../../../services/torzs/primitiv/fizetesimod.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';
import {LogonService} from '../../../../services/segedeszkosz/logon.service';
import {JogKod} from '../../../../enums/jogkod';

@Component({
  selector: 'app-fizetesimodegy',
  templateUrl: './fizetesimodegy.component.html',
  styleUrls: ['./fizetesimodegy.component.css']
})
export class FizetesimodegyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  fizetesimodservice: FizetesimodService;
  mod = false;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
              fizetesimodservice: FizetesimodService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.fizetesimodservice = fizetesimodservice;
  }

  vissza() {
    this._router.navigate(['../fizetesimod'], {relativeTo: this._route});
  }
  reszletek() {
    this._router.navigate(['reszletek'], {relativeTo: this._route});
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

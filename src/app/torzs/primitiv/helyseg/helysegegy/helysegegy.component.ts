import {Component, ViewChild} from '@angular/core';
import {HelysegService} from '../../../../services/torzs/primitiv/helyseg.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';
import {LogonService} from '../../../../services/segedeszkosz/logon.service';
import {JogKod} from '../../../../enums/jogkod';

@Component({
  selector: 'app-helysegegy',
  templateUrl: './helysegegy.component.html',
  styleUrls: ['./helysegegy.component.css']
})
export class HelysegegyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  helysegservice: HelysegService;
  mod = false;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
              helysegservice: HelysegService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.helysegservice = helysegservice;
  }

  vissza() {
    this._router.navigate(['../helyseg'], {relativeTo: this._route});
  }
  reszletek() {
    this._router.navigate(['reszletek'], {relativeTo: this._route});
  }
  torles () {
    this._router.navigate(['torles'], {relativeTo: this._route});
  }
  modositas() {
    this.helysegservice.uj = false;
    this.helysegservice.DtoEdited = Object.assign({}, this.helysegservice.Dto[this.helysegservice.DtoSelectedIndex]);
    this._router.navigate(['szerkesztes'], {relativeTo: this._route});
  }
}

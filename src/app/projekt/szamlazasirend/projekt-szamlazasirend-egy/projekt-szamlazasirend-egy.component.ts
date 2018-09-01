import {Component, ViewChild} from '@angular/core';
import {SzamlazasirendService} from '../szamlazasirend.service';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {ActivatedRoute, Router} from '@angular/router';
import {LogonService} from '../../../services/logon.service';

@Component({
  selector: 'app-projekt-szamlazasirend-egy',
  templateUrl: './projekt-szamlazasirend-egy.component.html',
  styleUrls: ['./projekt-szamlazasirend-egy.component.css']
})
export class ProjektSzamlazasirendEgyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szamlazasirendservice: SzamlazasirendService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
              szamlazasirendservice: SzamlazasirendService) {
    this.szamlazasirendservice = szamlazasirendservice;
  }

  vissza() {
    this._router.navigate(['../szamlazasirend'], {relativeTo: this._route});
  }
  reszletek() {
    this._router.navigate(['reszletek'], {relativeTo: this._route});
  }
  torles () {
    this._router.navigate(['torles'], {relativeTo: this._route});
  }
  modositas() {
    this.szamlazasirendservice.uj = false;
    this.szamlazasirendservice.DtoEdited = Object.assign({}, this.szamlazasirendservice.Dto[this.szamlazasirendservice.DtoSelectedIndex]);
    this._router.navigate(['szerkesztes'], {relativeTo: this._route});
  }
}

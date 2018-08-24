import {Component, ViewChild} from '@angular/core';
import {SzamlazasirendService} from '../../../../services/eszkoz/projekt/szamlazasirend.service';
import {LogonService} from '../../../../services/segedeszkosz/logon.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-projekt-szamlazasirend',
  templateUrl: './projekt-szamlazasirend.component.html',
  styleUrls: ['./projekt-szamlazasirend.component.css']
})
export class ProjektSzamlazasirendComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szamlazasirendservice: SzamlazasirendService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
              szamlazasirendservice: SzamlazasirendService) {
    this.szamlazasirendservice = szamlazasirendservice;
  }

  uj() {
    this.eppFrissit = true;
    this.szamlazasirendservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.szamlazasirendservice.uj = true;
        this.szamlazasirendservice.DtoEdited = res.Result[0];
        this.szamlazasirendservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this._router.navigate(['../szamlazasirenduj'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  setClickedRow(i: number) {
    this.szamlazasirendservice.DtoSelectedIndex = i;
    this.szamlazasirendservice.uj = false;
    this._router.navigate(['../szamlazasirendegy'], {relativeTo: this._route});
  }
}

import { Component } from '@angular/core';
import {SzamlazasirendService} from '../../../../services/eszkoz/projekt/szamlazasirend.service';

@Component({
  selector: 'app-projekt-szamlazasirend',
  templateUrl: './projekt-szamlazasirend.component.html',
  styleUrls: ['./projekt-szamlazasirend.component.css']
})
export class ProjektSzamlazasirendComponent {
  szamlazasirendservice: SzamlazasirendService;

  constructor(szamlazasirendservice: SzamlazasirendService) {
    this.szamlazasirendservice = szamlazasirendservice;
  }

  uj() {}

  setClickedRow(i: number) {
    this.szamlazasirendservice.DtoSelectedIndex = i;
    this.szamlazasirendservice.uj = false;
    // this._router.navigate(['../irattipusegy'], {relativeTo: this._route});
  }
}

import { Component } from '@angular/core';
import {SzamlazasirendService} from '../../../../../../services/eszkoz/projekt/szamlazasirend.service';

@Component({
  selector: 'app-projekt-szamlazasirend-reszletek',
  templateUrl: './projekt-szamlazasirend-reszletek.component.html',
  styleUrls: ['./projekt-szamlazasirend-reszletek.component.css']
})
export class ProjektSzamlazasirendReszletekComponent {
  szamlazasirendservice: SzamlazasirendService;

  constructor(szamlazasirendservice: SzamlazasirendService) {
    this.szamlazasirendservice = szamlazasirendservice;
  }
}

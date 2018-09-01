import { Component } from '@angular/core';
import {SzamlazasirendService} from '../szamlazasirend.service';

@Component({
  selector: 'app-projekt-szamlazasirend-container',
  templateUrl: './projekt-szamlazasirend-container.component.html',
  styleUrls: ['./projekt-szamlazasirend-container.component.css']
})
export class ProjektSzamlazasirendContainerComponent {
  szamlazasirendservice: SzamlazasirendService;

  constructor(szamlazasirendservice: SzamlazasirendService) {
    this.szamlazasirendservice = szamlazasirendservice;
  }
}

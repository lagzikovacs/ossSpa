import {Component, OnDestroy} from '@angular/core';
import {SzamlazasirendService} from '../szamlazasirend.service';

@Component({
  selector: 'app-projekt-szamlazasirend-reszletek',
  templateUrl: './projekt-szamlazasirend-reszletek.component.html',
  styleUrls: ['./projekt-szamlazasirend-reszletek.component.css']
})
export class ProjektSzamlazasirendReszletekComponent implements OnDestroy {
  szamlazasirendservice: SzamlazasirendService;

  constructor(szamlazasirendservice: SzamlazasirendService) {
    this.szamlazasirendservice = szamlazasirendservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

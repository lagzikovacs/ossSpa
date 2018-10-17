import {Component, OnDestroy} from '@angular/core';
import {SzamlazasirendService} from '../szamlazasirend.service';

@Component({
  selector: 'app-projekt-szamlazasirend-container',
  templateUrl: './projekt-szamlazasirend-container.component.html',
  styleUrls: ['./projekt-szamlazasirend-container.component.css']
})
export class ProjektSzamlazasirendContainerComponent implements OnDestroy {
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

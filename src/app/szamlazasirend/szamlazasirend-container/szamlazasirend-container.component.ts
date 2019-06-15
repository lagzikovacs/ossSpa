import {Component, OnDestroy} from '@angular/core';
import {SzamlazasirendService} from '../szamlazasirend.service';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-szamlazasirend-container',
  templateUrl: './szamlazasirend-container.component.html',
  animations: [rowanimation]
})
export class SzamlazasirendContainerComponent implements OnDestroy {
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

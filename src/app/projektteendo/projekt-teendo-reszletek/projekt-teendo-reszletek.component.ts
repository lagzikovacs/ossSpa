import {Component, OnDestroy} from '@angular/core';
import {ProjektteendoService} from '../projektteendo.service';

@Component({
  selector: 'app-projekt-teendo-reszletek',
  templateUrl: './projekt-teendo-reszletek.component.html',
  styleUrls: ['./projekt-teendo-reszletek.component.css']
})
export class ProjektTeendoReszletekComponent implements OnDestroy {
  projektteendoservice: ProjektteendoService;

  constructor(projektteendoservice: ProjektteendoService) {
    this.projektteendoservice = projektteendoservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

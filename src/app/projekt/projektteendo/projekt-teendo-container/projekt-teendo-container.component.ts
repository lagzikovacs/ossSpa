import {Component, OnDestroy} from '@angular/core';
import {ProjektteendoService} from '../projektteendo.service';
import {rowanimaton} from '../../../animation/rowAnimation';

@Component({
  selector: 'app-projekt-teendo-container',
  templateUrl: './projekt-teendo-container.component.html',
  styleUrls: ['./projekt-teendo-container.component.css'],
  animations: [rowanimaton]
})
export class ProjektTeendoContainerComponent implements OnDestroy {
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

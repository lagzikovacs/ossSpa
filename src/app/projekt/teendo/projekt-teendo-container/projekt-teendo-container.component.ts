import { Component } from '@angular/core';
import {ProjektteendoService} from '../projektteendo.service';

@Component({
  selector: 'app-projekt-teendo-container',
  templateUrl: './projekt-teendo-container.component.html',
  styleUrls: ['./projekt-teendo-container.component.css']
})
export class ProjektTeendoContainerComponent {
  projektteendoservice: ProjektteendoService;

  constructor(projektteendoservice: ProjektteendoService) {
    this.projektteendoservice = projektteendoservice;
  }
}

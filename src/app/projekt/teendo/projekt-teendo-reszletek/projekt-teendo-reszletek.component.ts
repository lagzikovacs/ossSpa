import { Component } from '@angular/core';
import {ProjektteendoService} from '../projektteendo.service';

@Component({
  selector: 'app-projekt-teendo-reszletek',
  templateUrl: './projekt-teendo-reszletek.component.html',
  styleUrls: ['./projekt-teendo-reszletek.component.css']
})
export class ProjektTeendoReszletekComponent {
  projektteendoservice: ProjektteendoService;

  constructor(projektteendoservice: ProjektteendoService) {
    this.projektteendoservice = projektteendoservice;
  }
}

import { Component } from '@angular/core';
import {TeendoService} from '../../../../../services/torzs/primitiv/teendo.service';

@Component({
  selector: 'app-teendo-reszletek',
  templateUrl: './teendo-reszletek.component.html',
  styleUrls: ['./teendo-reszletek.component.css']
})
export class TeendoReszletekComponent {
  teendoservice: TeendoService;

  constructor(teendoservice: TeendoService) {
    this.teendoservice = teendoservice;
  }
}

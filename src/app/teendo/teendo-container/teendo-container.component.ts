import { Component } from '@angular/core';
import {TeendoService} from "../teendo.service";

@Component({
  selector: 'app-teendo-container',
  templateUrl: './teendo-container.component.html',
  styleUrls: ['./teendo-container.component.css']
})
export class TeendoContainerComponent {
  teendoservice: TeendoService;

  constructor(teendoservice: TeendoService) {
    this.teendoservice = teendoservice;
  }
}

import { Component } from '@angular/core';
import {CsoportService} from "../csoport.service";

@Component({
  selector: 'app-csoport-container',
  templateUrl: './csoport-container.component.html',
  styleUrls: ['./csoport-container.component.css']
})
export class CsoportContainerComponent {
  csoportservice: CsoportService;

  constructor(csoportservice: CsoportService) {
    this.csoportservice = csoportservice;
  }
}

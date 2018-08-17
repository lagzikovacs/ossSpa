import { Component } from '@angular/core';
import {CsoportService} from '../../../../services/segedeszkosz/csoport.service';

@Component({
  selector: 'app-csoport-reszletek',
  templateUrl: './csoport-reszletek.component.html',
  styleUrls: ['./csoport-reszletek.component.css']
})
export class CsoportReszletekComponent {
  csoportservice: CsoportService;

  constructor(csoportservice: CsoportService) {
    this.csoportservice = csoportservice;
  }
}

import { Component } from '@angular/core';
import {CikkService} from '../../../../services/torzs/cikk.service';

@Component({
  selector: 'app-cikk-reszletek',
  templateUrl: './cikk-reszletek.component.html',
  styleUrls: ['./cikk-reszletek.component.css']
})
export class CikkReszletekComponent {
  cikkservice: CikkService;

  constructor(cikkservice: CikkService) {
    this.cikkservice = cikkservice;
  }
}

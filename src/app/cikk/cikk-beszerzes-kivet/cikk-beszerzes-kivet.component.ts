import { Component } from '@angular/core';
import {CikkService} from '../cikk.service';

@Component({
  selector: 'app-cikk-beszerzes-kivet',
  templateUrl: './cikk-beszerzes-kivet.component.html',
  styleUrls: ['./cikk-beszerzes-kivet.component.css']
})
export class CikkBeszerzesKivetComponent {
  cikkservice: CikkService;

  constructor(cikkservice: CikkService) {
    this.cikkservice = cikkservice;
  }
}

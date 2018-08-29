import { Component } from '@angular/core';
import {CikkService} from '../cikk.service';

@Component({
  selector: 'app-cikk-container',
  templateUrl: './cikk-container.component.html',
  styleUrls: ['./cikk-container.component.css']
})
export class CikkContainerComponent {
  cikkservice: CikkService;

  constructor(cikkservice: CikkService) {
    this.cikkservice = cikkservice;
  }
}

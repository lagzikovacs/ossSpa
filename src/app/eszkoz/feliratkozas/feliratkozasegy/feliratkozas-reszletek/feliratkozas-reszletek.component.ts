import { Component } from '@angular/core';
import {FeliratkozasService} from '../../../../services/eszkoz/feliratkozas.service';

@Component({
  selector: 'app-feliratkozas-reszletek',
  templateUrl: './feliratkozas-reszletek.component.html',
  styleUrls: ['./feliratkozas-reszletek.component.css']
})
export class FeliratkozasReszletekComponent {
  feliratkozasservice: FeliratkozasService;

  constructor(feliratkozasservice: FeliratkozasService) {
    this.feliratkozasservice = feliratkozasservice;
  }
}

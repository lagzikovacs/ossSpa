import { Component } from '@angular/core';
import {FeliratkozasService} from '../../../../services/feliratkozas.service';

@Component({
  selector: 'app-feliratkozas-projekt',
  templateUrl: './feliratkozas-projekt.component.html',
  styleUrls: ['./feliratkozas-projekt.component.css']
})
export class FeliratkozasProjektComponent {
  feliratkozasservice: FeliratkozasService;

  constructor(feliratkozasservice: FeliratkozasService) {
    this.feliratkozasservice = feliratkozasservice;
  }
}

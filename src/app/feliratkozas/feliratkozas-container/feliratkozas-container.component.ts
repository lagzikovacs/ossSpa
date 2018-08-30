import { Component } from '@angular/core';
import {FeliratkozasService} from '../feliratkozas.service';

@Component({
  selector: 'app-feliratkozas-container',
  templateUrl: './feliratkozas-container.component.html',
  styleUrls: ['./feliratkozas-container.component.css']
})
export class FeliratkozasContainerComponent {
  feliratkozasservice: FeliratkozasService;

  constructor(feliratkozasservice: FeliratkozasService) {
    this.feliratkozasservice = feliratkozasservice;
  }
}

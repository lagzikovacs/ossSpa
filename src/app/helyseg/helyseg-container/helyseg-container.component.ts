import { Component } from '@angular/core';
import {HelysegService} from '../helyseg.service';

@Component({
  selector: 'app-helyseg-container',
  templateUrl: './helyseg-container.component.html',
  styleUrls: ['./helyseg-container.component.css']
})
export class HelysegContainerComponent {
  helysegservice: HelysegService;

  constructor(helysegservice: HelysegService) {
    this.helysegservice = helysegservice;
  }
}

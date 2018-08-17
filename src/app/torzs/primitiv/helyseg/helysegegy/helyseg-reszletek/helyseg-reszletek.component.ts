import { Component } from '@angular/core';
import {HelysegService} from '../../../../../services/torzs/primitiv/helyseg.service';

@Component({
  selector: 'app-helyseg-reszletek',
  templateUrl: './helyseg-reszletek.component.html',
  styleUrls: ['./helyseg-reszletek.component.css']
})
export class HelysegReszletekComponent {
  helysegservice: HelysegService;

  constructor(helysegservice: HelysegService) {
    this.helysegservice = helysegservice;
  }
}

import {Component, OnDestroy} from '@angular/core';
import {HelysegService} from '../helyseg.service';

@Component({
  selector: 'app-helyseg-reszletek',
  templateUrl: './helyseg-reszletek.component.html',
  styleUrls: ['./helyseg-reszletek.component.css']
})
export class HelysegReszletekComponent implements OnDestroy {
  helysegservice: HelysegService;

  constructor(helysegservice: HelysegService) {
    this.helysegservice = helysegservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

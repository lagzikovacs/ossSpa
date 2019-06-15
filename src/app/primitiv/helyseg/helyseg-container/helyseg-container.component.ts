import {Component, OnDestroy} from '@angular/core';
import {HelysegService} from '../helyseg.service';

@Component({
  selector: 'app-helyseg-container',
  templateUrl: './helyseg-container.component.html'
})
export class HelysegContainerComponent implements OnDestroy {
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

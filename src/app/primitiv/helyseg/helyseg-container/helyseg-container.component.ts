import {Component, OnDestroy} from '@angular/core';
import {HelysegService} from '../helyseg.service';
import {KontenerMode} from '../../../enums/kontenermode';

@Component({
  selector: 'app-helyseg-container',
  templateUrl: './helyseg-container.component.html'
})
export class HelysegContainerComponent implements OnDestroy {
  kontenermode = KontenerMode.List;
  helysegservice: HelysegService;

  constructor(helysegservice: HelysegService) {
    this.helysegservice = helysegservice;
  }

  KontenerUj() {
    this.kontenermode = KontenerMode.Uj;
  }

  KontenerList() {
    this.kontenermode = KontenerMode.List;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

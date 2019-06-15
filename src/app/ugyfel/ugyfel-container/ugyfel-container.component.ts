import {Component, OnDestroy} from '@angular/core';
import {UgyfelService} from '../ugyfel.service';

@Component({
  selector: 'app-ugyfel-container',
  templateUrl: './ugyfel-container.component.html'
})
export class UgyfelContainerComponent implements OnDestroy {
  ugyfelservice: UgyfelService;

  constructor(ugyfelservice: UgyfelService) {
    this.ugyfelservice = ugyfelservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

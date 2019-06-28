import {Component, OnDestroy} from '@angular/core';
import {UgyfelService} from '../ugyfel.service';
import {KontenerMode} from '../../enums/kontenermode';

@Component({
  selector: 'app-ugyfel-container',
  templateUrl: './ugyfel-container.component.html'
})
export class UgyfelContainerComponent implements OnDestroy {
  kontenermode = KontenerMode.List;
  ugyfelservice: UgyfelService;
  elsokereses = true;
  osszesrekord = 0;

  constructor(ugyfelservice: UgyfelService) {
    this.ugyfelservice = ugyfelservice;
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

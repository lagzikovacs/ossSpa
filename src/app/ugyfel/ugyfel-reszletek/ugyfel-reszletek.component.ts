import {Component, OnDestroy} from '@angular/core';
import {UgyfelService} from '../ugyfel.service';

@Component({
  selector: 'app-ugyfel-reszletek',
  templateUrl: './ugyfel-reszletek.component.html',
  styleUrls: ['./ugyfel-reszletek.component.css']
})
export class UgyfelReszletekComponent implements OnDestroy {
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

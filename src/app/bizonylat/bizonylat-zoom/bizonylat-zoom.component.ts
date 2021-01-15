import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-bizonylat-zoom',
  templateUrl: './bizonylat-zoom.component.html'
})
export class BizonylatZoomComponent implements OnDestroy {
  eppFrissit = false;

  constructor() { }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

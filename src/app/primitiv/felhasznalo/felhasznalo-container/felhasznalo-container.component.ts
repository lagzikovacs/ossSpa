import {Component, OnDestroy} from '@angular/core';
import {FelhasznaloService} from '../felhasznalo.service';

@Component({
  selector: 'app-felhasznalo-container',
  templateUrl: './felhasznalo-container.component.html'
})
export class FelhasznaloContainerComponent implements OnDestroy {
  felhasznaloservice: FelhasznaloService;

  constructor(felhasznaloservice: FelhasznaloService) {
    this.felhasznaloservice = felhasznaloservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

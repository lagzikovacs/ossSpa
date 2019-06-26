import {Component, OnDestroy} from '@angular/core';
import {FelhasznaloService} from '../felhasznalo.service';
import {KontenerMode} from '../../../enums/kontenermode';

@Component({
  selector: 'app-felhasznalo-container',
  templateUrl: './felhasznalo-container.component.html'
})
export class FelhasznaloContainerComponent implements OnDestroy {
  kontenermode = KontenerMode.List;
  felhasznaloservice: FelhasznaloService;

  constructor(felhasznaloservice: FelhasznaloService) {
    this.felhasznaloservice = felhasznaloservice;
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

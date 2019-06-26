import {Component, OnDestroy} from '@angular/core';
import {CsoportService} from '../csoport.service';
import {KontenerMode} from '../../enums/kontenermode';

@Component({
  selector: 'app-csoport-container',
  templateUrl: './csoport-container.component.html'
})
export class CsoportContainerComponent implements OnDestroy {
  kontenermode = KontenerMode.List;
  csoportservice: CsoportService;

  constructor(csoportservice: CsoportService) {
    this.csoportservice = csoportservice;
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

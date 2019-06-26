import {Component, OnDestroy} from '@angular/core';
import {CikkService} from '../cikk.service';
import {KontenerMode} from '../../enums/kontenermode';

@Component({
  selector: 'app-cikk-container',
  templateUrl: './cikk-container.component.html'
})
export class CikkContainerComponent implements OnDestroy {
  kontenermode = KontenerMode.List;
  cikkservice: CikkService;

  constructor(cikkservice: CikkService) {
    this.cikkservice = cikkservice;
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

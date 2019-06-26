import {Component, OnDestroy} from '@angular/core';
import {MeService} from '../me.service';
import {KontenerMode} from '../../../enums/kontenermode';

@Component({
  selector: 'app-me-container',
  templateUrl: './me-container.component.html'
})
export class MeContainerComponent implements OnDestroy {
  kontenermode = KontenerMode.List;
  meservice: MeService;

  constructor(meservice: MeService) {
    this.meservice = meservice;
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

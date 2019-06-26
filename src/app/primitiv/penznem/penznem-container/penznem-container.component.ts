import {Component, OnDestroy} from '@angular/core';
import {PenznemService} from '../penznem.service';
import {KontenerMode} from '../../../enums/kontenermode';

@Component({
  selector: 'app-penznem-container',
  templateUrl: './penznem-container.component.html'
})
export class PenznemContainerComponent implements OnDestroy {
  kontenermode = KontenerMode.List;
  penznemservice: PenznemService;

  constructor(penznemservice: PenznemService) {
    this.penznemservice = penznemservice;
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

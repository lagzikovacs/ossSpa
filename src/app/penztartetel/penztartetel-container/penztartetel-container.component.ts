import {Component, OnDestroy} from '@angular/core';
import {PenztartetelService} from '../penztartetel.service';
import {KontenerMode} from '../../enums/kontenermode';

@Component({
  selector: 'app-penztartetel-container',
  templateUrl: './penztartetel-container.component.html'
})
export class PenztartetelContainerComponent implements OnDestroy {
  kontenermode = KontenerMode.List;
  penztartetelservice: PenztartetelService;

  constructor(penztartetelservice: PenztartetelService) {
    this.penztartetelservice = penztartetelservice;
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

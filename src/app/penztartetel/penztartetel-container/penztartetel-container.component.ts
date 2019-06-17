import {Component, OnDestroy} from '@angular/core';
import {PenztartetelService} from '../penztartetel.service';

@Component({
  selector: 'app-penztartetel-container',
  templateUrl: './penztartetel-container.component.html'
})
export class PenztartetelContainerComponent implements OnDestroy {
  penztartetelservice: PenztartetelService;

  constructor(penztartetelservice: PenztartetelService) {
    this.penztartetelservice = penztartetelservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

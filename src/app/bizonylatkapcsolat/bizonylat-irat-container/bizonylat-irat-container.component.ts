import {Component, OnDestroy} from '@angular/core';
import {BizonylatkapcsolatService} from '../bizonylatkapcsolat.service';

@Component({
  selector: 'app-bizonylat-irat-container',
  templateUrl: './bizonylat-irat-container.component.html'
})
export class BizonylatIratContainerComponent implements OnDestroy {
  bizonylatkapcsolatservice: BizonylatkapcsolatService;

  constructor(bizonylatkapcsolatservice: BizonylatkapcsolatService) {
    this.bizonylatkapcsolatservice = bizonylatkapcsolatservice;
    console.log('app-bizonylat-irat-container');
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

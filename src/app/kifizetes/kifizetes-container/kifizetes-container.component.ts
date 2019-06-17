import {Component, OnDestroy} from '@angular/core';
import {KifizetesService} from '../kifizetes.service';

@Component({
  selector: 'app-kifizetes-container',
  templateUrl: './kifizetes-container.component.html'
})
export class KifizetesContainerComponent implements OnDestroy {
  bizonylatkifizetesservice: KifizetesService;

  constructor(bizonylatkifizetesservice: KifizetesService) {
    this.bizonylatkifizetesservice = bizonylatkifizetesservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

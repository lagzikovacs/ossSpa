import {Component, OnDestroy} from '@angular/core';
import {BizonylatkifizetesService} from '../bizonylatkifizetes.service';

@Component({
  selector: 'app-bizonylat-kifizetes-container',
  templateUrl: './bizonylat-kifizetes-container.component.html',
  styleUrls: ['./bizonylat-kifizetes-container.component.css']
})
export class BizonylatKifizetesContainerComponent implements OnDestroy {
  bizonylatkifizetesservice: BizonylatkifizetesService;

  constructor(bizonylatkifizetesservice: BizonylatkifizetesService) {
    this.bizonylatkifizetesservice = bizonylatkifizetesservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

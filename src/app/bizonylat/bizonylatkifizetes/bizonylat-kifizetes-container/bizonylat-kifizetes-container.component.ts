import {Component} from '@angular/core';
import {BizonylatkifizetesService} from '../bizonylatkifizetes.service';

@Component({
  selector: 'app-bizonylat-kifizetes-container',
  templateUrl: './bizonylat-kifizetes-container.component.html',
  styleUrls: ['./bizonylat-kifizetes-container.component.css']
})
export class BizonylatKifizetesContainerComponent {
  bizonylatkifizetesservice: BizonylatkifizetesService;

  constructor(bizonylatkifizetesservice: BizonylatkifizetesService) {
    this.bizonylatkifizetesservice = bizonylatkifizetesservice;
  }
}

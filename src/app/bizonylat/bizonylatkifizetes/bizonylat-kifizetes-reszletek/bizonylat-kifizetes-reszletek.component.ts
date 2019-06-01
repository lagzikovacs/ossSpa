import {Component, OnDestroy, ViewChild} from '@angular/core';
import {BizonylatkifizetesService} from '../bizonylatkifizetes.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';

@Component({
  selector: 'app-bizonylat-kifizetes-reszletek',
  templateUrl: './bizonylat-kifizetes-reszletek.component.html',
  styleUrls: ['./bizonylat-kifizetes-reszletek.component.css']
})
export class BizonylatKifizetesReszletekComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

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

import {Component, ViewChild} from '@angular/core';
import {BizonylatkifizetesService} from '../bizonylatkifizetes.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';

@Component({
  selector: 'app-bizonylat-kifizetes-reszletek',
  templateUrl: './bizonylat-kifizetes-reszletek.component.html',
  styleUrls: ['./bizonylat-kifizetes-reszletek.component.css']
})
export class BizonylatKifizetesReszletekComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  bizonylatkifizetesservice: BizonylatkifizetesService;
  eppFrissit = false;

  constructor(bizonylatkifizetesservice: BizonylatkifizetesService) {
    this.bizonylatkifizetesservice = bizonylatkifizetesservice;
  }
}

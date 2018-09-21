import { Component } from '@angular/core';
import {BizonylatService} from '../bizonylat.service';

@Component({
  selector: 'app-bizonylat-szerkesztes',
  templateUrl: './bizonylat-szerkesztes.component.html',
  styleUrls: ['./bizonylat-szerkesztes.component.css']
})
export class BizonylatSzerkesztesComponent {
  bizonylatservice: BizonylatService;

  constructor(bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }
}

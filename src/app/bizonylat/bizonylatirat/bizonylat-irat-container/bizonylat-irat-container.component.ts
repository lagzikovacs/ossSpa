import { Component } from '@angular/core';
import {BizonylatkapcsolatService} from '../bizonylatkapcsolat.service';

@Component({
  selector: 'app-bizonylat-irat-container',
  templateUrl: './bizonylat-irat-container.component.html',
  styleUrls: ['./bizonylat-irat-container.component.css']
})
export class BizonylatIratContainerComponent {
  bizonylatkapcsolatservice: BizonylatkapcsolatService;

  constructor(bizonylatkapcsolatservice: BizonylatkapcsolatService) {
    this.bizonylatkapcsolatservice = bizonylatkapcsolatservice;
  }
}

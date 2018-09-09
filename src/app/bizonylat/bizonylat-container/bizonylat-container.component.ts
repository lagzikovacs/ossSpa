import { Component } from '@angular/core';
import {BizonylatService} from '../bizonylat.service';

@Component({
  selector: 'app-bizonylat-container',
  templateUrl: './bizonylat-container.component.html',
  styleUrls: ['./bizonylat-container.component.css']
})
export class BizonylatContainerComponent {
  bizonylatservice: BizonylatService;

  constructor(bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }
}

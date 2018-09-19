import { Component } from '@angular/core';
import {BizonylatService} from '../bizonylat.service';

@Component({
  selector: 'app-bizonylat-storno',
  templateUrl: './bizonylat-storno.component.html',
  styleUrls: ['./bizonylat-storno.component.css']
})
export class BizonylatStornoComponent {
  bizonylatservice: BizonylatService;

  constructor(bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }
}

import { Component, OnInit } from '@angular/core';
import {BizonylatService} from '../bizonylat.service';

@Component({
  selector: 'app-bizonylat-list',
  templateUrl: './bizonylat-list.component.html',
  styleUrls: ['./bizonylat-list.component.css']
})
export class BizonylatListComponent implements OnInit {
  bizonylatservice: BizonylatService;
  eppFrissit = false;

  constructor(bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  ngOnInit() {
  }

}

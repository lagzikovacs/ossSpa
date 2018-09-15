import {Component, OnInit} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {BizonylatDto} from '../bizonylatdto';

@Component({
  selector: 'app-bizonylat-reszletek',
  templateUrl: './bizonylat-reszletek.component.html',
  styleUrls: ['./bizonylat-reszletek.component.css']
})
export class BizonylatReszletekComponent implements OnInit {
  bizonylatservice: BizonylatService;
  dto = new Array<BizonylatDto>();

  constructor(bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  ngOnInit() {
    this.dto.unshift(this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex]);
  }
}

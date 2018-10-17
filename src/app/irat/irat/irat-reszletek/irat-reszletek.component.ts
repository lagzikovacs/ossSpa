import {Component, OnDestroy} from '@angular/core';
import {IratService} from '../irat.service';

@Component({
  selector: 'app-irat-reszletek',
  templateUrl: './irat-reszletek.component.html',
  styleUrls: ['./irat-reszletek.component.css']
})
export class IratReszletekComponent implements OnDestroy {
  iratservice: IratService;

  constructor(iratservice: IratService) {
    this.iratservice = iratservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

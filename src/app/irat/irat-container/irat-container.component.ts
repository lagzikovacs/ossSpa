import {Component, Input, OnDestroy} from '@angular/core';
import {IratService} from '../irat.service';

@Component({
  selector: 'app-irat-container',
  templateUrl: './irat-container.component.html'
})
export class IratContainerComponent implements OnDestroy {
  iratservice: IratService;

  @Input() enProjekt = true;

  constructor(iratservice: IratService) {
    this.iratservice = iratservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

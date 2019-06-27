import {Component, Input, OnDestroy} from '@angular/core';
import {IratService} from '../irat.service';
import {KontenerMode} from '../../enums/kontenermode';

@Component({
  selector: 'app-irat-container',
  templateUrl: './irat-container.component.html'
})
export class IratContainerComponent implements OnDestroy {
  kontenermode = KontenerMode.List;
  iratservice: IratService;

  @Input() enProjekt = true;

  constructor(iratservice: IratService) {
    this.iratservice = iratservice;
  }

  KontenerUj() {
    this.kontenermode = KontenerMode.Uj;
  }

  KontenerList() {
    this.kontenermode = KontenerMode.List;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

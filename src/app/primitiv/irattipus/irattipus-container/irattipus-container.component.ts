import {Component, OnDestroy} from '@angular/core';
import {IrattipusService} from '../irattipus.service';
import {KontenerMode} from '../../../enums/kontenermode';

@Component({
  selector: 'app-irattipus-container',
  templateUrl: './irattipus-container.component.html'
})
export class IrattipusContainerComponent implements OnDestroy {
  kontenermode = KontenerMode.List;
  irattipusservice: IrattipusService;

  constructor(irattipusservice: IrattipusService) {
    this.irattipusservice = irattipusservice;
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

import {Component, OnDestroy} from '@angular/core';
import {IrattipusService} from '../irattipus.service';

@Component({
  selector: 'app-irattipus-container',
  templateUrl: './irattipus-container.component.html'
})
export class IrattipusContainerComponent implements OnDestroy {
  irattipusservice: IrattipusService;

  constructor(irattipusservice: IrattipusService) {
    this.irattipusservice = irattipusservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

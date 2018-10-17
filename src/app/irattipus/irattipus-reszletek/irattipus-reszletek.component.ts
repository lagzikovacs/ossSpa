import {Component, OnDestroy} from '@angular/core';
import {IrattipusService} from '../irattipus.service';

@Component({
  selector: 'app-irattipus-reszletek',
  templateUrl: './irattipus-reszletek.component.html',
  styleUrls: ['./irattipus-reszletek.component.css']
})
export class IrattipusReszletekComponent implements OnDestroy {
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

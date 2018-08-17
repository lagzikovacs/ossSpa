import { Component } from '@angular/core';
import {IrattipusService} from '../../../../../services/torzs/primitiv/irattipus.service';

@Component({
  selector: 'app-irattipus-reszletek',
  templateUrl: './irattipus-reszletek.component.html',
  styleUrls: ['./irattipus-reszletek.component.css']
})
export class IrattipusReszletekComponent {
  irattipusservice: IrattipusService;

  constructor(irattipusservice: IrattipusService) {
    this.irattipusservice = irattipusservice;
  }
}

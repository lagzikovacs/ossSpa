import {Component, OnDestroy} from '@angular/core';
import {CsoportService} from '../csoport.service';

@Component({
  selector: 'app-csoport-reszletek',
  templateUrl: './csoport-reszletek.component.html',
  styleUrls: ['./csoport-reszletek.component.css']
})
export class CsoportReszletekComponent implements OnDestroy {
  csoportservice: CsoportService;

  constructor(csoportservice: CsoportService) {
    this.csoportservice = csoportservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

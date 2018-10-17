import {Component, OnDestroy} from '@angular/core';
import {CsoportService} from '../csoport.service';

@Component({
  selector: 'app-csoport-container',
  templateUrl: './csoport-container.component.html',
  styleUrls: ['./csoport-container.component.css']
})
export class CsoportContainerComponent implements OnDestroy {
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

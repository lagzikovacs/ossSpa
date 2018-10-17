import {Component, OnDestroy} from '@angular/core';
import {CikkService} from '../cikk.service';

@Component({
  selector: 'app-cikk-reszletek',
  templateUrl: './cikk-reszletek.component.html',
  styleUrls: ['./cikk-reszletek.component.css']
})
export class CikkReszletekComponent implements OnDestroy {
  cikkservice: CikkService;

  constructor(cikkservice: CikkService) {
    this.cikkservice = cikkservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

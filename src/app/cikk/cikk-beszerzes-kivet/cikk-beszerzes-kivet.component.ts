import {Component, OnDestroy} from '@angular/core';
import {CikkService} from '../cikk.service';

@Component({
  selector: 'app-cikk-beszerzes-kivet',
  templateUrl: './cikk-beszerzes-kivet.component.html',
  styleUrls: ['./cikk-beszerzes-kivet.component.css']
})
export class CikkBeszerzesKivetComponent implements OnDestroy {
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

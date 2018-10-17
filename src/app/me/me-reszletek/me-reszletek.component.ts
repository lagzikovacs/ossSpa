import {Component, OnDestroy} from '@angular/core';
import {MeService} from '../me.service';

@Component({
  selector: 'app-me-reszletek',
  templateUrl: './me-reszletek.component.html',
  styleUrls: ['./me-reszletek.component.css']
})
export class MeReszletekComponent implements OnDestroy {
  meservice: MeService;

  constructor(meservice: MeService) {
    this.meservice = meservice;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

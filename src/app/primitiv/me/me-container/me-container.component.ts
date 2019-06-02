import {Component, OnDestroy} from '@angular/core';
import {MeService} from '../me.service';

@Component({
  selector: 'app-me-container',
  templateUrl: './me-container.component.html',
  styleUrls: ['./me-container.component.css']
})
export class MeContainerComponent implements OnDestroy {
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

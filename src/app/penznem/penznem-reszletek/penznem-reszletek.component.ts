import {Component, OnDestroy} from '@angular/core';
import {PenznemService} from '../penznem.service';

@Component({
  selector: 'app-penznem-reszletek',
  templateUrl: './penznem-reszletek.component.html',
  styleUrls: ['./penznem-reszletek.component.css']
})
export class PenznemReszletekComponent implements OnDestroy {
  penznemservice: PenznemService;

  constructor(penznemservice: PenznemService) {
    this.penznemservice = penznemservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

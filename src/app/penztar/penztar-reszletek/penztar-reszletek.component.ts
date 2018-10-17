import {Component, OnDestroy} from '@angular/core';
import {PenztarService} from '../penztar.service';

@Component({
  selector: 'app-penztar-reszletek',
  templateUrl: './penztar-reszletek.component.html',
  styleUrls: ['./penztar-reszletek.component.css']
})
export class PenztarReszletekComponent implements OnDestroy {
  penztarservice: PenztarService;

  constructor(penztarservice: PenztarService) {
    this.penztarservice = penztarservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

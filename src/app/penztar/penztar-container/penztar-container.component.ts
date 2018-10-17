import {Component, OnDestroy} from '@angular/core';
import {PenztarService} from '../penztar.service';

@Component({
  selector: 'app-penztar-container',
  templateUrl: './penztar-container.component.html',
  styleUrls: ['./penztar-container.component.css']
})
export class PenztarContainerComponent implements OnDestroy {
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

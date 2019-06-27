import {Component, OnDestroy} from '@angular/core';
import {PenztarService} from '../penztar.service';
import {KontenerMode} from '../../enums/kontenermode';

@Component({
  selector: 'app-penztar-container',
  templateUrl: './penztar-container.component.html'
})
export class PenztarContainerComponent implements OnDestroy {
  kontenermode = KontenerMode.List;
  penztarservice: PenztarService;

  constructor(penztarservice: PenztarService) {
    this.penztarservice = penztarservice;
  }

  KontenerUj() {
    this.kontenermode = KontenerMode.Uj;
  }

  KontenerList() {
    this.kontenermode = KontenerMode.List;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

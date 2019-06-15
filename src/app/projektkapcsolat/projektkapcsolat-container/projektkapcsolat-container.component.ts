import {Component, Input, OnDestroy} from '@angular/core';
import {rowanimation} from '../../animation/rowAnimation';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';

@Component({
  selector: 'app-projektkapcsolat-container',
  templateUrl: './projektkapcsolat-container.component.html',
  animations: [rowanimation]
})
export class ProjektkapcsolatContainerComponent implements OnDestroy {
  projektkapcsolatservice: ProjektkapcsolatService;

  constructor(projektkapcsolatservice: ProjektkapcsolatService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

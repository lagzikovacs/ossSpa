import {Component, OnDestroy} from '@angular/core';
import {FizetesimodService} from '../fizetesimod.service';
import {KontenerMode} from '../../../enums/kontenermode';

@Component({
  selector: 'app-fizetesimod-container',
  templateUrl: './fizetesimod-container.component.html'
})
export class FizetesimodContainerComponent implements OnDestroy {
  kontenermode = KontenerMode.List;
  fizetesimodservice: FizetesimodService;

  constructor(fizetesimodservice: FizetesimodService) {
    this.fizetesimodservice = fizetesimodservice;
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

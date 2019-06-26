import {Component, OnDestroy} from '@angular/core';
import {TermekdijService} from '../termekdij.service';
import {KontenerMode} from '../../../enums/kontenermode';

@Component({
  selector: 'app-termekdij-container',
  templateUrl: './termekdij-container.component.html'
})
export class TermekdijContainerComponent implements OnDestroy {
  kontenermode = KontenerMode.List;
  termekdijservice: TermekdijService;

  constructor(termekdijservice: TermekdijService) {
    this.termekdijservice = termekdijservice;
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

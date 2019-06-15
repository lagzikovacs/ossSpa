import {Component, OnDestroy} from '@angular/core';
import {TermekdijService} from '../termekdij.service';

@Component({
  selector: 'app-termekdij-container',
  templateUrl: './termekdij-container.component.html'
})
export class TermekdijContainerComponent implements OnDestroy {
  termekdijservice: TermekdijService;

  constructor(termekdijservice: TermekdijService) {
    this.termekdijservice = termekdijservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

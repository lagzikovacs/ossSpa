import {Component, OnDestroy} from '@angular/core';
import {TermekdijService} from '../termekdij.service';

@Component({
  selector: 'app-termekdij-reszletek',
  templateUrl: './termekdij-reszletek.component.html',
  styleUrls: ['./termekdij-reszletek.component.css']
})
export class TermekdijReszletekComponent implements OnDestroy {
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

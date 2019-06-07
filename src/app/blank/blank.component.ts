import {Component, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html'
})
export class BlankComponent implements OnDestroy {
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

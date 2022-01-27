import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-egyszeru-uzenet',
  templateUrl: './egyszeru-uzenet.component.html'
})
export class EgyszeruUzenetComponent implements OnDestroy {
  @Input() uzenet = '';

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

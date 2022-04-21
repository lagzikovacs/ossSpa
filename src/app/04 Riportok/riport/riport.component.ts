import {Component, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-riport',
  templateUrl: './riport.component.html'
})
export class RiportComponent implements OnDestroy {
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

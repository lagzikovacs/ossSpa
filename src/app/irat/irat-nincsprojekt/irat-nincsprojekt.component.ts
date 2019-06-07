import {Component, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-irat-nincsprojekt',
  templateUrl: './irat-nincsprojekt.component.html'
})
export class IratNincsprojektComponent implements OnDestroy {
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

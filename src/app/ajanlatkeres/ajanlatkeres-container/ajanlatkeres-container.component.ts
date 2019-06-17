import {Component, OnDestroy} from '@angular/core';
import {AjanlatkeresService} from '../ajanlatkeres.service';

@Component({
  selector: 'app-ajanlatkeres-container',
  templateUrl: './ajanlatkeres-container.component.html'
})
export class AjanlatkeresContainerComponent implements OnDestroy {
  ajanlatkeresservice: AjanlatkeresService;

  constructor(ajanlatkeresservice: AjanlatkeresService) {
    this.ajanlatkeresservice = ajanlatkeresservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

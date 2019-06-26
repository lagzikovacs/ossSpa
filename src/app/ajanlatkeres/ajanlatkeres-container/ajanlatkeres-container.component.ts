import {Component, OnDestroy} from '@angular/core';
import {AjanlatkeresService} from '../ajanlatkeres.service';
import {KontenerMode} from '../../enums/kontenermode';

@Component({
  selector: 'app-ajanlatkeres-container',
  templateUrl: './ajanlatkeres-container.component.html'
})
export class AjanlatkeresContainerComponent implements OnDestroy {
  kontenermode = KontenerMode.List;
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

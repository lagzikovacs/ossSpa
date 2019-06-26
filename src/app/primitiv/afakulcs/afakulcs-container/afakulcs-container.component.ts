import {Component, OnDestroy} from '@angular/core';
import {AfakulcsService} from '../afakulcs.service';
import {KontenerMode} from '../../../enums/kontenermode';

@Component({
  selector: 'app-afakulcs-container',
  templateUrl: './afakulcs-container.component.html'
})
export class AfakulcsContainerComponent implements OnDestroy {
  kontenermode = KontenerMode.List;
  afakulcsservice: AfakulcsService;

  constructor(afakulcsservice: AfakulcsService) {
    this.afakulcsservice = afakulcsservice;
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

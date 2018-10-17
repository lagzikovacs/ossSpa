import {Component, OnDestroy} from '@angular/core';
import {AfakulcsService} from '../afakulcs.service';

@Component({
  selector: 'app-afakulcs-container',
  templateUrl: './afakulcs-container.component.html',
  styleUrls: ['./afakulcs-container.component.css']
})
export class AfakulcsContainerComponent implements OnDestroy {
  afakulcsservice: AfakulcsService;

  constructor(afakulcsservice: AfakulcsService) {
    this.afakulcsservice = afakulcsservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

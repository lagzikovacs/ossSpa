import {Component, OnDestroy} from '@angular/core';
import {AfakulcsService} from '../../../afakulcs.service';

@Component({
  selector: 'app-afakulcs-reszletek',
  templateUrl: './afakulcs-reszletek.component.html',
  styleUrls: ['./afakulcs-reszletek.component.css']
})
export class AfakulcsReszletekComponent implements OnDestroy {
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

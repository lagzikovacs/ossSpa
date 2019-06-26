import {Component, OnDestroy} from '@angular/core';
import {TeendoService} from '../teendo.service';
import {KontenerMode} from '../../../enums/kontenermode';

@Component({
  selector: 'app-teendo-container',
  templateUrl: './teendo-container.component.html'
})
export class TeendoContainerComponent implements OnDestroy {
  kontenermode = KontenerMode.List;
  teendoservice: TeendoService;

  constructor(teendoservice: TeendoService) {
    this.teendoservice = teendoservice;
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

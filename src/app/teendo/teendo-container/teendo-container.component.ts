import {Component, OnDestroy} from '@angular/core';
import {TeendoService} from '../teendo.service';

@Component({
  selector: 'app-teendo-container',
  templateUrl: './teendo-container.component.html',
  styleUrls: ['./teendo-container.component.css']
})
export class TeendoContainerComponent implements OnDestroy {
  teendoservice: TeendoService;

  constructor(teendoservice: TeendoService) {
    this.teendoservice = teendoservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

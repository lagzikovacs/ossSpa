import {Component, OnDestroy} from '@angular/core';
import {TeendoService} from '../teendo.service';

@Component({
  selector: 'app-teendo-reszletek',
  templateUrl: './teendo-reszletek.component.html',
  styleUrls: ['./teendo-reszletek.component.css']
})
export class TeendoReszletekComponent implements OnDestroy {
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

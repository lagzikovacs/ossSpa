import {Component, OnDestroy} from '@angular/core';
import {UgynokService} from '../ugynok.service';

@Component({
  selector: 'app-ugynok-reszletek',
  templateUrl: './ugynok-reszletek.component.html',
  styleUrls: ['./ugynok-reszletek.component.css']
})
export class UgynokReszletekComponent implements OnDestroy {
  ugynokservice: UgynokService;

  constructor(ugynokservice: UgynokService) {
    this.ugynokservice = ugynokservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

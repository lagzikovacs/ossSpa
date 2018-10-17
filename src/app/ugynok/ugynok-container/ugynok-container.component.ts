import {Component, OnDestroy} from '@angular/core';
import {UgynokService} from '../ugynok.service';

@Component({
  selector: 'app-ugynok-container',
  templateUrl: './ugynok-container.component.html',
  styleUrls: ['./ugynok-container.component.css']
})
export class UgynokContainerComponent implements OnDestroy {
  feliratkozasservice: UgynokService;

  constructor(feliratkozasservice: UgynokService) {
    this.feliratkozasservice = feliratkozasservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

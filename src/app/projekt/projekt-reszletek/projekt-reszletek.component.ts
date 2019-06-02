import {Component, OnDestroy} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-projekt-reszletek',
  templateUrl: './projekt-reszletek.component.html',
  styleUrls: ['./projekt-reszletek.component.css'],
  animations: [rowanimation]
})
export class ProjektReszletekComponent implements OnDestroy {
  projektservice: ProjektService;

  constructor(projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

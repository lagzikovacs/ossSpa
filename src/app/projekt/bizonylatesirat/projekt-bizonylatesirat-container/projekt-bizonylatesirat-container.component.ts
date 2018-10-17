import {Component, OnDestroy} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';

@Component({
  selector: 'app-projekt-bizonylatesirat-container',
  templateUrl: './projekt-bizonylatesirat-container.component.html',
  styleUrls: ['./projekt-bizonylatesirat-container.component.css']
})
export class ProjektBizonylatesiratContainerComponent implements OnDestroy {
  projektkapcsolatservice: ProjektkapcsolatService;

  constructor(projektkapcsolatservice: ProjektkapcsolatService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

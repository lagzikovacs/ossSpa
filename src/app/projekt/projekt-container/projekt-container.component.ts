import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {ProjektService} from '../projekt.service';

@Component({
  selector: 'app-projekt-container',
  templateUrl: './projekt-container.component.html',
  styleUrls: ['./projekt-container.component.css']
})
export class ProjektContainerComponent implements OnDestroy {
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

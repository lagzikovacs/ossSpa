import {Component, OnDestroy} from '@angular/core';
import {FizetesimodService} from '../fizetesimod.service';

@Component({
  selector: 'app-fizetesimod-container',
  templateUrl: './fizetesimod-container.component.html',
  styleUrls: ['./fizetesimod-container.component.css']
})
export class FizetesimodContainerComponent implements OnDestroy {
  fizetesimodservice: FizetesimodService;

  constructor(fizetesimodservice: FizetesimodService) {
    this.fizetesimodservice = fizetesimodservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

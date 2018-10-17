import {Component, OnDestroy} from '@angular/core';
import {FizetesimodService} from '../fizetesimod.service';

@Component({
  selector: 'app-fizetesimod-reszletek',
  templateUrl: './fizetesimod-reszletek.component.html',
  styleUrls: ['./fizetesimod-reszletek.component.css']
})
export class FizetesimodReszletekComponent implements OnDestroy {
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

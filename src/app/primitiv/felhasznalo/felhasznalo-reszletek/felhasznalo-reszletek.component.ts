import {Component, OnDestroy} from '@angular/core';
import {FelhasznaloService} from '../felhasznalo.service';

@Component({
  selector: 'app-felhasznalo-reszletek',
  templateUrl: './felhasznalo-reszletek.component.html',
  styleUrls: ['./felhasznalo-reszletek.component.css']
})
export class FelhasznaloReszletekComponent implements OnDestroy {
  felhasznaloservice: FelhasznaloService;

  constructor(felhasznaloservice: FelhasznaloService) {
    this.felhasznaloservice = felhasznaloservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

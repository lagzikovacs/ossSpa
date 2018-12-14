import {Component, OnDestroy} from '@angular/core';
import {ProjektkapcsolatService} from '../../projekt/bizonylatesirat/projektkapcsolat.service';

@Component({
  selector: 'app-ugyfel-ter-bizonylatesirat-list',
  templateUrl: './ugyfel-ter-bizonylatesirat-list.component.html',
  styleUrls: ['./ugyfel-ter-bizonylatesirat-list.component.css']
})
export class UgyfelTerBizonylatesiratListComponent implements OnDestroy {
  projektkapcsolatservice: ProjektkapcsolatService;
  eppFrissit = false;

  constructor(projektkapcsolatservice: ProjektkapcsolatService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  setClickedRow(i: number) {
    console.log(this.projektkapcsolatservice.Dto[i]);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

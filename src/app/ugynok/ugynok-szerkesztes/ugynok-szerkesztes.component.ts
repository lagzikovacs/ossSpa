import {Component, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-ugynok-szerkesztes',
  templateUrl: './ugynok-szerkesztes.component.html',
  styleUrls: ['./ugynok-szerkesztes.component.css']
})
export class UgynokSzerkesztesComponent implements OnDestroy {

  constructor() { }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

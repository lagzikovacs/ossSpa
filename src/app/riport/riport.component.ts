import {Component, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-riport',
  templateUrl: './riport.component.html',
  styleUrls: ['./riport.component.css']
})
export class RiportComponent implements OnDestroy {

  constructor() { }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

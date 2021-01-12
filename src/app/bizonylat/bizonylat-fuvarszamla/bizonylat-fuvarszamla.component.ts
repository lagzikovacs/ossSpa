import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-bizonylat-fuvarszamla',
  templateUrl: './bizonylat-fuvarszamla.component.html',
  animations: [rowanimation]
})
export class BizonylatFuvarszamlaComponent implements OnInit, OnDestroy {
  @Input() BizonylatKod: number;
  eppFrissit = false;
  EgyMode = 0;

  constructor() { }

  ngOnInit(): void {
  }

  doPage(i: number) {
    this.EgyMode = i;
  }

  onMegsem() {
    this.EgyMode = 0;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

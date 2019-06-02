import {Component, OnDestroy} from '@angular/core';
import {PenznemService} from "../penznem.service";

@Component({
  selector: 'app-penznem-container',
  templateUrl: './penznem-container.component.html',
  styleUrls: ['./penznem-container.component.css']
})
export class PenznemContainerComponent implements OnDestroy {
  penznemservice: PenznemService;

  constructor(penznemservice: PenznemService) {
    this.penznemservice = penznemservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

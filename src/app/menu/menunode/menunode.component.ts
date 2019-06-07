import {Component, Input, OnDestroy} from '@angular/core';
import {AngularmenuDto} from '../angularmenudto';

@Component({
  selector: 'app-menunode',
  templateUrl: './menunode.component.html'
})
export class MenunodeComponent implements OnDestroy {
  @Input() menunode: AngularmenuDto;

  constructor() { }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

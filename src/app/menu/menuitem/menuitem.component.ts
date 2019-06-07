import {Component, Input, OnDestroy} from '@angular/core';
import {AngularmenuDto} from '../angularmenudto';
import {MenuService} from '../menu.service';

@Component({
  selector: 'app-menuitem',
  templateUrl: './menuitem.component.html'
})
export class MenuitemComponent implements OnDestroy {
  @Input() menunode: AngularmenuDto;

  menuservice: MenuService;

  constructor(menuservice: MenuService) {
    this.menuservice = menuservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

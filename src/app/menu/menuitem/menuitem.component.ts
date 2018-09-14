import {Component, Input} from '@angular/core';
import {AngularmenuDto} from '../angularmenudto';
import {MenuService} from '../menu.service';

@Component({
  selector: 'app-menuitem',
  templateUrl: './menuitem.component.html',
  styleUrls: ['./menuitem.component.css']
})
export class MenuitemComponent {
  @Input() menunode: AngularmenuDto;

  menuservice: MenuService;

  constructor(menuservice: MenuService) {
    this.menuservice = menuservice;
  }
}
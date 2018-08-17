import { Component } from '@angular/core';
import {PenznemService} from '../../../../../services/torzs/primitiv/penznem.service';

@Component({
  selector: 'app-penznem-reszletek',
  templateUrl: './penznem-reszletek.component.html',
  styleUrls: ['./penznem-reszletek.component.css']
})
export class PenznemReszletekComponent {
  penznemservice: PenznemService;

  constructor(penznemservice: PenznemService) {
    this.penznemservice = penznemservice;
  }
}

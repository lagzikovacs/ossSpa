import { Component } from '@angular/core';
import {MeService} from '../../../../../services/torzs/primitiv/me.service';

@Component({
  selector: 'app-me-reszletek',
  templateUrl: './me-reszletek.component.html',
  styleUrls: ['./me-reszletek.component.css']
})
export class MeReszletekComponent {
  meservice: MeService;

  constructor(meservice: MeService) {
    this.meservice = meservice;
  }
}

import { Component } from '@angular/core';
import {MeService} from '../me.service';

@Component({
  selector: 'app-me-container',
  templateUrl: './me-container.component.html',
  styleUrls: ['./me-container.component.css']
})
export class MeContainerComponent {
  meservice: MeService;

  constructor(meservice: MeService) {
    this.meservice = meservice;
  }
}

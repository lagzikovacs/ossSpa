import { Component } from '@angular/core';
import {ProjektService} from '../projekt.service';

@Component({
  selector: 'app-projekt-container',
  templateUrl: './projekt-container.component.html',
  styleUrls: ['./projekt-container.component.css']
})
export class ProjektContainerComponent {
  projektservice: ProjektService;

  constructor(projektservice: ProjektService) {
    this.projektservice = projektservice;
  }
}

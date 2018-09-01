import { Component } from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';

@Component({
  selector: 'app-projekt-bizonylatesirat-container',
  templateUrl: './projekt-bizonylatesirat-container.component.html',
  styleUrls: ['./projekt-bizonylatesirat-container.component.css']
})
export class ProjektBizonylatesiratContainerComponent {
  projektkapcsolatservice: ProjektkapcsolatService;

  constructor(projektkapcsolatservice: ProjektkapcsolatService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
  }
}

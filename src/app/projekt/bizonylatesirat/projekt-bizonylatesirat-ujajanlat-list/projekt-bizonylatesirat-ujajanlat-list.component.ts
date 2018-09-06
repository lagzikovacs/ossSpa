import { Component } from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';

@Component({
  selector: 'app-projekt-bizonylatesirat-ujajanlat-list',
  templateUrl: './projekt-bizonylatesirat-ujajanlat-list.component.html',
  styleUrls: ['./projekt-bizonylatesirat-ujajanlat-list.component.css']
})
export class ProjektBizonylatesiratUjajanlatListComponent {
  projektkapcsolatservice: ProjektkapcsolatService;

  constructor(projektkapcsolatservice: ProjektkapcsolatService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  setClickedRow(i) {

  }
}

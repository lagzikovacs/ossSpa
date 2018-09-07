import { Component } from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {UjajanlatContainerMode} from "../ujajanlatcontainermode";
import {UjajanlatSzerkesztesMode} from "../ujajanlatszerkesztesmode";

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
    this.projektkapcsolatservice.AjanlattetelIndex = i;
    this.projektkapcsolatservice.AjanlatContainerMode = UjajanlatContainerMode.Szerkesztes;
    this.projektkapcsolatservice.AjanlatSzerkesztesMode = UjajanlatSzerkesztesMode.Blank;
  }
}

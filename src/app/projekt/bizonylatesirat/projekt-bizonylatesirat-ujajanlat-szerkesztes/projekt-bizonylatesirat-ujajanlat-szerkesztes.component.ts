import { Component, OnInit } from '@angular/core';
import {ProjektkapcsolatService} from "../projektkapcsolat.service";
import {UjajanlatSzerkesztesMode} from "../ujajanlatszerkesztesmode";
import {UjajanlatContainerMode} from "../ujajanlatcontainermode";

@Component({
  selector: 'app-projekt-bizonylatesirat-ujajanlat-szerkesztes',
  templateUrl: './projekt-bizonylatesirat-ujajanlat-szerkesztes.component.html',
  styleUrls: ['./projekt-bizonylatesirat-ujajanlat-szerkesztes.component.css']
})
export class ProjektBizonylatesiratUjajanlatSzerkesztesComponent implements OnInit {
  projektkapcsolatservice: ProjektkapcsolatService;

  constructor(projektkapcsolatservice: ProjektkapcsolatService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.navigal();
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    this.projektkapcsolatservice.AjanlatSzerkesztesMode = UjajanlatSzerkesztesMode.Blank;
    this.projektkapcsolatservice.AjanlatContainerMode = UjajanlatContainerMode.List;
  }
}

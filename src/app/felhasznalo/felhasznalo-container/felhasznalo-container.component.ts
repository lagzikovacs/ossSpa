import { Component } from '@angular/core';
import {FelhasznaloService} from "../felhasznalo.service";

@Component({
  selector: 'app-felhasznalo-container',
  templateUrl: './felhasznalo-container.component.html',
  styleUrls: ['./felhasznalo-container.component.css']
})
export class FelhasznaloContainerComponent {
  felhasznaloservice: FelhasznaloService;

  constructor(felhasznaloservice: FelhasznaloService) {
    this.felhasznaloservice = felhasznaloservice;
  }
}

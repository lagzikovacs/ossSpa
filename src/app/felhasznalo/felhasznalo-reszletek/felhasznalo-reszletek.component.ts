import { Component } from '@angular/core';
import {FelhasznaloService} from '../felhasznalo.service';

@Component({
  selector: 'app-felhasznalo-reszletek',
  templateUrl: './felhasznalo-reszletek.component.html',
  styleUrls: ['./felhasznalo-reszletek.component.css']
})
export class FelhasznaloReszletekComponent {
  felhasznaloservice: FelhasznaloService;

  constructor(felhasznaloservice: FelhasznaloService) {
    this.felhasznaloservice = felhasznaloservice;
  }
}

import { Component } from '@angular/core';
import {ProjektService} from '../projekt.service';

@Component({
  selector: 'app-projekt-reszletek',
  templateUrl: './projekt-reszletek.component.html',
  styleUrls: ['./projekt-reszletek.component.css']
})
export class ProjektReszletekComponent {
  projektservice: ProjektService;

  constructor(projektservice: ProjektService) {
    this.projektservice = projektservice;
  }
}

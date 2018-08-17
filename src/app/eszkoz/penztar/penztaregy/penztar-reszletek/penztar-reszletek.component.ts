import { Component } from '@angular/core';
import {PenztarService} from '../../../../services/eszkoz/penztar.service';

@Component({
  selector: 'app-penztar-reszletek',
  templateUrl: './penztar-reszletek.component.html',
  styleUrls: ['./penztar-reszletek.component.css']
})
export class PenztarReszletekComponent {
  penztarservice: PenztarService;

  constructor(penztarservice: PenztarService) {
    this.penztarservice = penztarservice;
  }
}

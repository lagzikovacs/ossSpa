import { Component } from '@angular/core';
import {PenztarService} from '../penztar.service';

@Component({
  selector: 'app-penztar-container',
  templateUrl: './penztar-container.component.html',
  styleUrls: ['./penztar-container.component.css']
})
export class PenztarContainerComponent {
  penztarservice: PenztarService;

  constructor(penztarservice: PenztarService) {
    this.penztarservice = penztarservice;
  }
}

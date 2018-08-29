import { Component } from '@angular/core';
import {UgyfelService} from '../ugyfel.service';

@Component({
  selector: 'app-ugyfel-container',
  templateUrl: './ugyfel-container.component.html',
  styleUrls: ['./ugyfel-container.component.css']
})
export class UgyfelContainerComponent {
  ugyfelservice: UgyfelService;

  constructor(ugyfelservice: UgyfelService) {
    this.ugyfelservice = ugyfelservice;
  }
}

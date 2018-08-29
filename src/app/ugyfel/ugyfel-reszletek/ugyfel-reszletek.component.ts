import { Component } from '@angular/core';
import {UgyfelService} from '../ugyfel.service';

@Component({
  selector: 'app-ugyfel-reszletek',
  templateUrl: './ugyfel-reszletek.component.html',
  styleUrls: ['./ugyfel-reszletek.component.css']
})
export class UgyfelReszletekComponent {
  ugyfelservice: UgyfelService;

  constructor(ugyfelservice: UgyfelService) {
    this.ugyfelservice = ugyfelservice;
  }
}

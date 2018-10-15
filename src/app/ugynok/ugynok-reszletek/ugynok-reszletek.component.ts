import { Component } from '@angular/core';
import {FeliratkozasService} from '../ugynok.service';

@Component({
  selector: 'app-feliratkozas-reszletek',
  templateUrl: './ugynok-reszletek.component.html',
  styleUrls: ['./ugynok-reszletek.component.css']
})
export class FeliratkozasReszletekComponent {
  feliratkozasservice: FeliratkozasService;

  constructor(feliratkozasservice: FeliratkozasService) {
    this.feliratkozasservice = feliratkozasservice;
  }
}

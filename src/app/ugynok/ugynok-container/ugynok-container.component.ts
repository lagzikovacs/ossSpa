import { Component } from '@angular/core';
import {FeliratkozasService} from '../ugynok.service';

@Component({
  selector: 'app-ugynok-container',
  templateUrl: './ugynok-container.component.html',
  styleUrls: ['./ugynok-container.component.css']
})
export class UgynokContainerComponent {
  feliratkozasservice: FeliratkozasService;

  constructor(feliratkozasservice: FeliratkozasService) {
    this.feliratkozasservice = feliratkozasservice;
  }
}

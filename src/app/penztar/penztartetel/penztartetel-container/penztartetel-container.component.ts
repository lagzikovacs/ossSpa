import { Component } from '@angular/core';
import {PenztartetelService} from '../penztartetel.service';

@Component({
  selector: 'app-penztartetel-container',
  templateUrl: './penztartetel-container.component.html',
  styleUrls: ['./penztartetel-container.component.css']
})
export class PenztartetelContainerComponent {
  penztartetelservice: PenztartetelService;

  constructor(penztartetelservice: PenztartetelService) {
    this.penztartetelservice = penztartetelservice;
  }
}

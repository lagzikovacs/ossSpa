import { Component } from '@angular/core';
import {PenznemService} from "../penznem.service";

@Component({
  selector: 'app-penznem-container',
  templateUrl: './penznem-container.component.html',
  styleUrls: ['./penznem-container.component.css']
})
export class PenznemContainerComponent {
  penznemservice: PenznemService;

  constructor(penznemservice: PenznemService) {
    this.penznemservice = penznemservice;
  }
}

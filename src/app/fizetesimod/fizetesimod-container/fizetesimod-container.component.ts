import { Component } from '@angular/core';
import {FizetesimodService} from "../fizetesimod.service";

@Component({
  selector: 'app-fizetesimod-container',
  templateUrl: './fizetesimod-container.component.html',
  styleUrls: ['./fizetesimod-container.component.css']
})
export class FizetesimodContainerComponent {
  fizetesimodservice: FizetesimodService;

  constructor(fizetesimodservice: FizetesimodService) {
    this.fizetesimodservice = fizetesimodservice;
  }
}

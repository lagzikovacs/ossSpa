import { Component } from '@angular/core';
import {TermekdijService} from '../termekdij.service';

@Component({
  selector: 'app-termekdij-container',
  templateUrl: './termekdij-container.component.html',
  styleUrls: ['./termekdij-container.component.css']
})
export class TermekdijContainerComponent {
  termekdijservice: TermekdijService;

  constructor(termekdijservice: TermekdijService) {
    this.termekdijservice = termekdijservice;
  }
}

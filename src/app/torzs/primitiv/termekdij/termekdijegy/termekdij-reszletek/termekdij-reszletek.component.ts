import { Component } from '@angular/core';
import {TermekdijService} from '../../../../../services/torzs/primitiv/termekdij.service';

@Component({
  selector: 'app-termekdij-reszletek',
  templateUrl: './termekdij-reszletek.component.html',
  styleUrls: ['./termekdij-reszletek.component.css']
})
export class TermekdijReszletekComponent {
  termekdijservice: TermekdijService;

  constructor(termekdijservice: TermekdijService) {
    this.termekdijservice = termekdijservice;
  }
}

import { Component } from '@angular/core';
import {TermekdijService} from '../termekdij.service';

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

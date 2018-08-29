import { Component } from '@angular/core';
import {AfakulcsService} from '../afakulcs.service';

@Component({
  selector: 'app-afakulcs-reszletek',
  templateUrl: './afakulcs-reszletek.component.html',
  styleUrls: ['./afakulcs-reszletek.component.css']
})
export class AfakulcsReszletekComponent {
  afakulcsservice: AfakulcsService;

  constructor(afakulcsservice: AfakulcsService) {
    this.afakulcsservice = afakulcsservice;
  }
}

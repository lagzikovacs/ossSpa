import { Component } from '@angular/core';
import {AfakulcsService} from '../afakulcs.service';

@Component({
  selector: 'app-afakulcs-container',
  templateUrl: './afakulcs-container.component.html',
  styleUrls: ['./afakulcs-container.component.css']
})
export class AfakulcsContainerComponent {
  afakulcsservice: AfakulcsService;

  constructor(afakulcsservice: AfakulcsService) {
    this.afakulcsservice = afakulcsservice;
  }
}

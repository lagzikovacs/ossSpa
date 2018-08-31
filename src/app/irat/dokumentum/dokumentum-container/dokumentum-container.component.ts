import { Component } from '@angular/core';
import {DokumentumService} from '../dokumentum.service';

@Component({
  selector: 'app-dokumentum-container',
  templateUrl: './dokumentum-container.component.html',
  styleUrls: ['./dokumentum-container.component.css']
})
export class DokumentumContainerComponent {
  dokumentumservice: DokumentumService;

  constructor(dokumentumservice: DokumentumService) {
    this.dokumentumservice = dokumentumservice;
  }
}

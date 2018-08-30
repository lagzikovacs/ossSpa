import { Component } from '@angular/core';
import {DokumentumService} from '../dokumentum.service';

@Component({
  selector: 'app-dokumentum-reszletek',
  templateUrl: './dokumentum-reszletek.component.html',
  styleUrls: ['./dokumentum-reszletek.component.css']
})
export class DokumentumReszletekComponent {
  dokumentumservice: DokumentumService;

  constructor(dokumentumservice: DokumentumService) {
    this.dokumentumservice = dokumentumservice;
  }
}

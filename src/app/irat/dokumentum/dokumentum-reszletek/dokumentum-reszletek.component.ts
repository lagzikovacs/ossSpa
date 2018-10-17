import {Component, OnDestroy} from '@angular/core';
import {DokumentumService} from '../dokumentum.service';

@Component({
  selector: 'app-dokumentum-reszletek',
  templateUrl: './dokumentum-reszletek.component.html',
  styleUrls: ['./dokumentum-reszletek.component.css']
})
export class DokumentumReszletekComponent implements OnDestroy {
  dokumentumservice: DokumentumService;

  constructor(dokumentumservice: DokumentumService) {
    this.dokumentumservice = dokumentumservice;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

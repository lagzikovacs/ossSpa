import {Component, OnDestroy} from '@angular/core';
import {DokumentumService} from '../dokumentum.service';

@Component({
  selector: 'app-dokumentum-container',
  templateUrl: './dokumentum-container.component.html'
})
export class DokumentumContainerComponent implements OnDestroy {
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

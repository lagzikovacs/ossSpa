import {Component, OnDestroy} from '@angular/core';
import {DokumentumService} from '../dokumentum.service';
import {KontenerMode} from '../../enums/kontenermode';

@Component({
  selector: 'app-dokumentum-container',
  templateUrl: './dokumentum-container.component.html'
})
export class DokumentumContainerComponent implements OnDestroy {
  kontenermode = KontenerMode.List;
  dokumentumservice: DokumentumService;

  constructor(dokumentumservice: DokumentumService) {
    this.dokumentumservice = dokumentumservice;
  }

  KontenerUj() {
    this.kontenermode = KontenerMode.Uj;
  }

  KontenerList() {
    this.kontenermode = KontenerMode.List;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

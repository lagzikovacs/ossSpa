import { Component } from '@angular/core';
import {DokumentumService} from '../dokumentum.service';
import {DokumentumContainerMode} from '../dokumentumcontainermode';
import {DokumentumEgyMode} from '../dokumentumegymode';

@Component({
  selector: 'app-dokumentum-egy',
  templateUrl: './dokumentum-egy.component.html',
  styleUrls: ['./dokumentum-egy.component.css']
})
export class DokumentumEgyComponent {
  dokumentumservice: DokumentumService;

  constructor(dokumentumservice: DokumentumService) {
    this.dokumentumservice = dokumentumservice;
  }

  vissza() {
    this.dokumentumservice.ContainerMode = DokumentumContainerMode.List;
  }
  reszletek() {
    this.dokumentumservice.EgyMode = DokumentumEgyMode.Reszletek;
  }
  torles() {
    this.dokumentumservice.EgyMode = DokumentumEgyMode.Torles;
  }
  letoltes() {
    // this._router.navigate(['letoltes'], {relativeTo: this._route});
  }

}

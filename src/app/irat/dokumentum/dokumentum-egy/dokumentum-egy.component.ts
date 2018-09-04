import {Component, ViewChild} from '@angular/core';
import {DokumentumService} from '../dokumentum.service';
import {DokumentumContainerMode} from '../dokumentumcontainermode';
import {DokumentumEgyMode} from '../dokumentumegymode';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-dokumentum-egy',
  templateUrl: './dokumentum-egy.component.html',
  styleUrls: ['./dokumentum-egy.component.css']
})
export class DokumentumEgyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  dokumentumservice: DokumentumService;
  eppFrissit = false;

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
    this.eppFrissit = true;
    this.dokumentumservice.Kimentes()
      .then(res => {
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

}

import {Component, OnDestroy, ViewChild} from '@angular/core';
import {DokumentumService} from '../dokumentum.service';
import {DokumentumContainerMode} from '../dokumentumcontainermode';
import {DokumentumEgyMode} from '../dokumentumegymode';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-dokumentum-egy',
  templateUrl: './dokumentum-egy.component.html',
  styleUrls: ['./dokumentum-egy.component.css'],
  animations: [rowanimation]
})
export class DokumentumEgyComponent implements OnDestroy {
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
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  letoltesPDF() {
    this.eppFrissit = true;
    this.dokumentumservice.KimentesPDF()
      .then(res => {
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.dokumentumservice.Delete(this.dokumentumservice.Dto[this.dokumentumservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.dokumentumservice.Dto.splice(this.dokumentumservice.DtoSelectedIndex, 1);
        this.dokumentumservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.dokumentumservice.ContainerMode = DokumentumContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  TorlesCancel() {
    this.dokumentumservice.EgyMode = DokumentumEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

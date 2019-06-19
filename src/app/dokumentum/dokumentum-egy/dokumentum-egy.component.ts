import {Component, OnDestroy} from '@angular/core';
import {DokumentumService} from '../dokumentum.service';
import {DokumentumContainerMode} from '../dokumentumcontainermode';
import {DokumentumEgyMode} from '../dokumentumegymode';
import {rowanimation} from '../../animation/rowAnimation';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-dokumentum-egy',
  templateUrl: './dokumentum-egy.component.html',
  animations: [rowanimation]
})
export class DokumentumEgyComponent implements OnDestroy {
  dokumentumservice: DokumentumService;
  eppFrissit = false;
  ri = -1;

  constructor(dokumentumservice: DokumentumService,
              private _errorservice: ErrorService) {
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
        this._errorservice.Error = err;
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
        this._errorservice.Error = err;
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
        this.eppFrissit = false;
        this._errorservice.Error = err;
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

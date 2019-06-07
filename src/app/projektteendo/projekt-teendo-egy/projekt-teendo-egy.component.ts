import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ProjektteendoService} from '../projektteendo.service';
import {ProjektteendoContainerMode} from '../projektteendocontainermode';
import {ProjektteendoEgyMode} from '../projekttendoegymode';
import {rowanimation} from '../../animation/rowAnimation';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {LogonService} from '../../logon/logon.service';
import {deepCopy} from '../../tools/deepCopy';

@Component({
  selector: 'app-projekt-teendo-egy',
  templateUrl: './projekt-teendo-egy.component.html',
  animations: [rowanimation]
})
export class ProjektTeendoEgyComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektteendoservice: ProjektteendoService;
  eppFrissit = false;
  ri = -1;

  constructor(private _logonservice: LogonService,
              projektteendoservice: ProjektteendoService) {
    this.projektteendoservice = projektteendoservice;
  }

  vissza() {
    this.projektteendoservice.ContainerMode = ProjektteendoContainerMode.List;
  }
  reszletek() {
    this.projektteendoservice.EgyMode = ProjektteendoEgyMode.Reszletek;
  }
  torles () {
    this.projektteendoservice.EgyMode = ProjektteendoEgyMode.Torles;
  }
  modositas() {
    this.projektteendoservice.uj = false;
    this.projektteendoservice.DtoEdited = deepCopy(this.projektteendoservice.Dto[this.projektteendoservice.DtoSelectedIndex]);
    this.projektteendoservice.EgyMode = ProjektteendoEgyMode.Modositas;
  }
  elvegezve() {
    this.projektteendoservice.uj = false;
    this.projektteendoservice.DtoEdited = deepCopy(this.projektteendoservice.Dto[this.projektteendoservice.DtoSelectedIndex]);
    this.projektteendoservice.EgyMode = ProjektteendoEgyMode.Elvegezve;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.projektteendoservice.Delete(this.projektteendoservice.Dto[this.projektteendoservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.projektteendoservice.Dto.splice(this.projektteendoservice.DtoSelectedIndex, 1);
        this.projektteendoservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.projektteendoservice.ContainerMode = ProjektteendoContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  TorlesCancel() {
    this.projektteendoservice.EgyMode = ProjektteendoEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

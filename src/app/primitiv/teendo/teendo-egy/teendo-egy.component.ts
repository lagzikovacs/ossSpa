import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {TeendoService} from '../teendo.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {TeendoContainerMode} from '../teendocontainermode';
import {TeendoEgyMode} from '../teendoegymode';
import {rowanimation} from '../../../animation/rowAnimation';

@Component({
  selector: 'app-teendo-egy',
  templateUrl: './teendo-egy.component.html',
  animations: [rowanimation]
})
export class TeendoEgyComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  teendoservice: TeendoService;
  mod = false;
  eppFrissit = false;
  ri = -1;

  constructor(private _logonservice: LogonService,
              teendoservice: TeendoService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.teendoservice = teendoservice;
  }

  vissza() {
    this.teendoservice.ContainerMode = TeendoContainerMode.List;
  }
  reszletek() {
    this.teendoservice.EgyMode = TeendoEgyMode.Reszletek;
  }
  torles () {
    this.teendoservice.EgyMode = TeendoEgyMode.Torles;
  }
  modositas() {
    this.teendoservice.uj = false;
    this.teendoservice.DtoEdited = Object.assign({}, this.teendoservice.Dto[this.teendoservice.DtoSelectedIndex]);
    this.teendoservice.EgyMode = TeendoEgyMode.Modositas;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.teendoservice.Delete(this.teendoservice.Dto[this.teendoservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.teendoservice.Dto.splice(this.teendoservice.DtoSelectedIndex, 1);
        this.teendoservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.teendoservice.ContainerMode = TeendoContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  TorlesCancel() {
    this.teendoservice.EgyMode = TeendoEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

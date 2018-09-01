import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {LogonService} from '../../../services/logon.service';
import {ProjektteendoService} from '../projektteendo.service';
import {ProjektteendoContainerMode} from '../projektteendocontainermode';
import {ProjektteendoEgyMode} from '../projekttendoegymode';

@Component({
  selector: 'app-projekt-teendo-egy',
  templateUrl: './projekt-teendo-egy.component.html',
  styleUrls: ['./projekt-teendo-egy.component.css']
})
export class ProjektTeendoEgyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektteendoservice: ProjektteendoService;
  eppFrissit = false;

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
    this.projektteendoservice.DtoEdited = Object.assign({}, this.projektteendoservice.Dto[this.projektteendoservice.DtoSelectedIndex]);
    this.projektteendoservice.EgyMode = ProjektteendoEgyMode.Modositas;
  }
  elvegezve() {
    this.projektteendoservice.uj = false;
    this.projektteendoservice.DtoEdited = Object.assign({}, this.projektteendoservice.Dto[this.projektteendoservice.DtoSelectedIndex]);
    this.projektteendoservice.EgyMode = ProjektteendoEgyMode.Elvegezve;
  }
}

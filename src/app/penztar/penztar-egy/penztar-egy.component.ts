import {Component, ViewChild} from '@angular/core';
import {PenztarService} from '../penztar.service';
import {LogonService} from '../../services/logon.service';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {JogKod} from '../../enums/jogkod';
import {PenztarContainerMode} from "../penztarcontainermode";
import {PenztarEgyMode} from "../penztaregymode";

@Component({
  selector: 'app-penztar-egy',
  templateUrl: './penztar-egy.component.html',
  styleUrls: ['./penztar-egy.component.css']
})
export class PenztarEgyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  penztarservice: PenztarService;
  mod = false;
  nyitva = false;
  eppFrissit = false;

  constructor(private _logonservice: LogonService,
              penztarservice: PenztarService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PENZTARMOD]);
    this.penztarservice = penztarservice;
    this.nyitva = this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex].NYITVA;
  }

  vissza() {
    this.penztarservice.ContainerMode = PenztarContainerMode.List;
  }
  reszletek() {
    this.penztarservice.EgyMode = PenztarEgyMode.Reszletek;
  }
  torles () {
    this.penztarservice.EgyMode = PenztarEgyMode.Torles;
  }
  modositas() {
    this.penztarservice.uj = false;
    this.penztarservice.DtoEdited = Object.assign({}, this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex]);
    this.penztarservice.EgyMode = PenztarEgyMode.Modositas;
  }
  tetelek() {
    this.penztarservice.EgyMode = PenztarEgyMode.Tetelek;
  }
  export() {
    this.penztarservice.EgyMode = PenztarEgyMode.Export;
  }
}
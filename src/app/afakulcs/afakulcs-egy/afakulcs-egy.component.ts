import {Component, ViewChild} from '@angular/core';
import {AfakulcsService} from '../afakulcs.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {AfakulcsContainerMode} from "../afakulcscontainermode";
import {AfakulcsEgyMode} from "../afakulcsegymode";

@Component({
  selector: 'app-afakulcs-egy',
  templateUrl: './afakulcs-egy.component.html',
  styleUrls: ['./afakulcs-egy.component.css']
})
export class AfakulcsEgyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  afakulcsservice: AfakulcsService;
  mod = false;
  eppFrissit = false;

  constructor(private _logonservice: LogonService,
              afakulcsservice: AfakulcsService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.afakulcsservice = afakulcsservice;
  }

  vissza() {
    this.afakulcsservice.ContainerMode = AfakulcsContainerMode.List;
  }
  reszletek() {
    this.afakulcsservice.EgyMode = AfakulcsEgyMode.Reszletek;
  }
  torles () {
    this.afakulcsservice.EgyMode = AfakulcsEgyMode.Torles;
  }
  modositas() {
    this.afakulcsservice.uj = false;
    this.afakulcsservice.DtoEdited = Object.assign({}, this.afakulcsservice.Dto[this.afakulcsservice.DtoSelectedIndex]);
    this.afakulcsservice.EgyMode = AfakulcsEgyMode.Modositas;
  }
}

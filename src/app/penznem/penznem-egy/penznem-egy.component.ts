import {Component, ViewChild} from '@angular/core';
import {PenznemService} from '../penznem.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {PenznemContainerMode} from "../penznemcontainermode";
import {PenznemEgyMode} from "../penznemegymode";

@Component({
  selector: 'app-penznem-egy',
  templateUrl: './penznem-egy.component.html',
  styleUrls: ['./penznem-egy.component.css']
})
export class PenznemEgyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  penznemservice: PenznemService;
  mod = false;
  eppFrissit = false;

  constructor(private _logonservice: LogonService,
              penznemservice: PenznemService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.penznemservice = penznemservice;
  }

  vissza() {
    this.penznemservice.ContainerMode = PenznemContainerMode.List;
  }
  reszletek() {
    this.penznemservice.EgyMode = PenznemEgyMode.Reszletek;
  }
  torles () {
    this.penznemservice.EgyMode = PenznemEgyMode.Torles;
  }
  modositas() {
    this.penznemservice.uj = false;
    this.penznemservice.DtoEdited = Object.assign({}, this.penznemservice.Dto[this.penznemservice.DtoSelectedIndex]);
    this.penznemservice.EgyMode = PenznemEgyMode.Modositas;
  }
}

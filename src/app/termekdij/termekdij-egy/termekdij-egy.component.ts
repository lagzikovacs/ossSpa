import {Component, ViewChild} from '@angular/core';
import {TermekdijService} from '../termekdij.service';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {LogonService} from '../../services/logon.service';
import {JogKod} from '../../enums/jogkod';
import {TermekdijContainerMode} from "../termekdijcontainermode";
import {TermekdijEgyMode} from "../termekdijegymode";

@Component({
  selector: 'app-termekdij-egy',
  templateUrl: './termekdij-egy.component.html',
  styleUrls: ['./termekdij-egy.component.css']
})
export class TermekdijEgyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  termekdijservice: TermekdijService;
  mod = false;
  eppFrissit = false;

  constructor(private _logonservice: LogonService,
              termekdijservice: TermekdijService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.termekdijservice = termekdijservice;
  }

  vissza() {
    this.termekdijservice.ContainerMode = TermekdijContainerMode.List;
  }
  reszletek() {
    this.termekdijservice.EgyMode = TermekdijEgyMode.Reszletek;
  }
  torles () {
    this.termekdijservice.EgyMode = TermekdijEgyMode.Torles;
  }
  modositas() {
    this.termekdijservice.uj = false;
    this.termekdijservice.DtoEdited = Object.assign({}, this.termekdijservice.Dto[this.termekdijservice.DtoSelectedIndex]);
    this.termekdijservice.EgyMode = TermekdijEgyMode.Modositas;
  }
}

import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {IrattipusService} from '../irattipus.service';
import {LogonService} from '../../services/logon.service';
import {JogKod} from '../../enums/jogkod';
import {IrattipusEgyMode} from "../irattipusegymode";
import {IrattipusContainerMode} from "../irattipuscontainermode";

@Component({
  selector: 'app-irattipus-egy',
  templateUrl: './irattipus-egy.component.html',
  styleUrls: ['./irattipus-egy.component.css']
})
export class IrattipusEgyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  irattipusservice: IrattipusService;
  mod = false;
  eppFrissit = false;

  constructor(private _logonservice: LogonService,
              irattipusservice: IrattipusService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.irattipusservice = irattipusservice;
  }

  vissza() {
    this.irattipusservice.ContainerMode = IrattipusContainerMode.List;
  }
  reszletek() {
    this.irattipusservice.EgyMode = IrattipusEgyMode.Reszletek;
  }
  torles () {
    this.irattipusservice.EgyMode = IrattipusEgyMode.Torles;
  }
  modositas() {
    this.irattipusservice.uj = false;
    this.irattipusservice.DtoEdited = Object.assign({}, this.irattipusservice.Dto[this.irattipusservice.DtoSelectedIndex]);
    this.irattipusservice.EgyMode = IrattipusEgyMode.Modositas;
  }
}
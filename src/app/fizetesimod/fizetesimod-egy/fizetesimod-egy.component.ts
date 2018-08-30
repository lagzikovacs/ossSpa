import {Component, ViewChild} from '@angular/core';
import {FizetesimodService} from '../fizetesimod.service';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {LogonService} from '../../services/logon.service';
import {JogKod} from '../../enums/jogkod';
import {FizetesimodContainerMode} from "../fizetesimodcontainermode";
import {FizetesimodEgyMode} from "../fizetesimodegymode";

@Component({
  selector: 'app-fizetesimod-egy',
  templateUrl: './fizetesimod-egy.component.html',
  styleUrls: ['./fizetesimod-egy.component.css']
})
export class FizetesimodEgyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  fizetesimodservice: FizetesimodService;
  mod = false;
  eppFrissit = false;

  constructor(private _logonservice: LogonService,
              fizetesimodservice: FizetesimodService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.fizetesimodservice = fizetesimodservice;
  }

  vissza() {
    this.fizetesimodservice.ContainerMode = FizetesimodContainerMode.List;
  }
  reszletek() {
    this.fizetesimodservice.EgyMode = FizetesimodEgyMode.Reszletek;
  }
  torles () {
    this.fizetesimodservice.EgyMode = FizetesimodEgyMode.Torles;
  }
  modositas() {
    this.fizetesimodservice.uj = false;
    this.fizetesimodservice.DtoEdited = Object.assign({}, this.fizetesimodservice.Dto[this.fizetesimodservice.DtoSelectedIndex]);
    this.fizetesimodservice.EgyMode = FizetesimodEgyMode.Modositas;
  }
}

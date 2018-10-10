import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {FelhasznaloService} from '../felhasznalo.service';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {FelhasznaloContainerMode} from '../felhasznalocontainermode';
import {FelhasznaloEgyMode} from '../felhasznaloegymode';
import {EsemenynaploService} from "../../esemenynaplo/esemenynaplo.service";

@Component({
  selector: 'app-felhasznalo-egy',
  templateUrl: './felhasznalo-egy.component.html',
  styleUrls: ['./felhasznalo-egy.component.css']
})
export class FelhasznaloEgyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  felhasznaloservice: FelhasznaloService;
  mod = false;
  eppFrissit = false;

  constructor(private _logonservice: LogonService,
              private _esemenynaploservice: EsemenynaploService,
              felhasznaloservice: FelhasznaloService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.FELHASZNALOMOD]);
    this.felhasznaloservice = felhasznaloservice;
  }

  vissza() {
    this.felhasznaloservice.ContainerMode = FelhasznaloContainerMode.List;
  }
  reszletek() {
    this.felhasznaloservice.EgyMode = FelhasznaloEgyMode.Reszletek;
  }
  torles () {
    this.felhasznaloservice.EgyMode = FelhasznaloEgyMode.Torles;
  }
  modositas() {
    this.felhasznaloservice.uj = false;
    this.felhasznaloservice.DtoEdited = Object.assign({}, this.felhasznaloservice.Dto[this.felhasznaloservice.DtoSelectedIndex]);
    this.felhasznaloservice.EgyMode = FelhasznaloEgyMode.Modositas;
  }
  jelszo() {
    this.felhasznaloservice.EgyMode = FelhasznaloEgyMode.Jelszo;
  }
  tevekenyseg() {
    this._esemenynaploservice.Felhasznalokod = this.felhasznaloservice.Dto[this.felhasznaloservice.DtoSelectedIndex].FELHASZNALOKOD;
    this.felhasznaloservice.EgyMode = FelhasznaloEgyMode.Tevekenyseg;
  }
}

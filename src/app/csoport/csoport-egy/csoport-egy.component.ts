import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {CsoportService} from '../csoport.service';
import {CsoportContainerMode} from "../csoportcontainermode";
import {CsoportEgyMode} from "../csoportegymode";

@Component({
  selector: 'app-csoport-egy',
  templateUrl: './csoport-egy.component.html',
  styleUrls: ['./csoport-egy.component.css']
})
export class CsoportEgyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  csoportservice: CsoportService;
  eppFrissit = false;

  constructor(csoportservice: CsoportService) {
    this.csoportservice = csoportservice;
  }

  vissza() {
    this.csoportservice.ContainerMode = CsoportContainerMode.List;
  }
  reszletek() {
    this.csoportservice.EgyMode = CsoportEgyMode.Reszletek;
  }
  torles () {
    this.csoportservice.EgyMode = CsoportEgyMode.Torles;
  }
  modositas() {
    this.csoportservice.uj = false;
    this.csoportservice.DtoEdited = Object.assign({}, this.csoportservice.Dto[this.csoportservice.DtoSelectedIndex]);
    this.csoportservice.EgyMode = CsoportEgyMode.Modositas;
  }
  felhasznalo() {
    this.csoportservice.EgyMode = CsoportEgyMode.Felhasznalo;
  }
  jog() {
    this.csoportservice.EgyMode = CsoportEgyMode.Jog;
  }
}

import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {TeendoService} from '../teendo.service';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {TeendoContainerMode} from '../teendocontainermode';
import {TeendoEgyMode} from '../teendoegymode';

@Component({
  selector: 'app-teendo-egy',
  templateUrl: './teendo-egy.component.html',
  styleUrls: ['./teendo-egy.component.css']
})
export class TeendoEgyComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  teendoservice: TeendoService;
  mod = false;
  eppFrissit = false;

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

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

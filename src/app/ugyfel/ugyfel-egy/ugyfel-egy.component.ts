import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {UgyfelService} from '../ugyfel.service';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {UgyfelContainerMode} from '../ugyfelcontainermode';
import {UgyfelEgyMode} from '../ugyfelegymode';

@Component({
  selector: 'app-ugyfel-egy',
  templateUrl: './ugyfel-egy.component.html',
  styleUrls: ['./ugyfel-egy.component.css']
})
export class UgyfelEgyComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  ugyfelservice: UgyfelService;
  mod = false;
  eppFrissit = false;
  nincsProjekt = false;

  constructor(private _logonservice: LogonService,
              ugyfelservice: UgyfelService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.UGYFELEKMOD]);
    this.ugyfelservice = ugyfelservice;
  }

  vissza() {
    this.ugyfelservice.ContainerMode = UgyfelContainerMode.List;
  }
  reszletek() {
    this.ugyfelservice.EgyMode = UgyfelEgyMode.Reszletek;
  }
  torles() {
    this.ugyfelservice.EgyMode = UgyfelEgyMode.Torles;
  }
  modositas() {
    this.ugyfelservice.uj = false;
    this.ugyfelservice.DtoEdited = Object.assign({}, this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex]);
    this.ugyfelservice.EgyMode = UgyfelEgyMode.Modositas;
  }
  projekt() {
    this.ugyfelservice.EgyMode = UgyfelEgyMode.Projekt;
  }
  ugyfelterlink() {
    this.ugyfelservice.EgyMode = UgyfelEgyMode.UgyfelterLink;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

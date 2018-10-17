import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {MeService} from '../me.service';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {MeContainerMode} from '../mecontainermode';
import {MeEgyMode} from '../meegymode';

@Component({
  selector: 'app-me-egy',
  templateUrl: './me-egy.component.html',
  styleUrls: ['./me-egy.component.css']
})
export class MeEgyComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  meservice: MeService;
  mod = false;
  eppFrissit = false;

  constructor(private _logonservice: LogonService,
              meservice: MeService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.meservice = meservice;
  }

  vissza() {
    this.meservice.ContainerMode = MeContainerMode.List;
  }
  reszletek() {
    this.meservice.EgyMode = MeEgyMode.Reszletek;
  }
  torles () {
    this.meservice.EgyMode = MeEgyMode.Torles;
  }
  modositas() {
    this.meservice.uj = false;
    this.meservice.DtoEdited = Object.assign({}, this.meservice.Dto[this.meservice.DtoSelectedIndex]);
    this.meservice.EgyMode = MeEgyMode.Modositas;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

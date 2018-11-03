import {Component, OnDestroy} from '@angular/core';
import {UgynokService} from '../ugynok.service';
import {UgynokContainerMode} from '../ugynokcontainermode';
import {UgynokEgyMode} from '../ugynokegymode';
import {LogonService} from "../../logon/logon.service";
import {JogKod} from "../../enums/jogkod";

@Component({
  selector: 'app-feliratkozas-egy',
  templateUrl: './ugynok-egy.component.html',
  styleUrls: ['./ugynok-egy.component.css']
})
export class FeliratkozasEgyComponent implements OnDestroy {
  feliratkozasservice: UgynokService;
  enprojekt = false;

  constructor(private _logonservice: LogonService,
              feliratkozasservice: UgynokService) {
    this.enprojekt = _logonservice.Jogaim.includes(JogKod[JogKod.PROJEKT]);
    this.feliratkozasservice = feliratkozasservice;
  }

  vissza() {
    this.feliratkozasservice.ContainerMode = UgynokContainerMode.List;
  }
  reszletek() {
    this.feliratkozasservice.EgyMode = UgynokEgyMode.Reszletek;
  }
  projekt() {
    this.feliratkozasservice.EgyMode = UgynokEgyMode.Projekt;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

import { Component } from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {BizonylatContainerMode} from '../bizonylatcontainermode';
import {ProjektkapcsolatService} from '../../projekt/bizonylatesirat/projektkapcsolat.service';
import {BizonylatesIratContainerMode} from '../../projekt/bizonylatesirat/bizonylatesiratcontainermode';
import {BizonylatEgyMode} from "../bizonylategymode";
import {BizonylatkifizetesService} from "../bizonylatkifizetes/bizonylatkifizetes.service";
import {BizonylatKifizetesContainerMode} from "../bizonylatkifizetes/bizonylatkifizetescontainermode";
import {BizonylatKapcsolatContainerMode} from "../bizonylatirat/bizonylatkapcsolatcontainermode";
import {BizonylatkapcsolatService} from "../bizonylatirat/bizonylatkapcsolat.service";

@Component({
  selector: 'app-bizonylat-egy',
  templateUrl: './bizonylat-egy.component.html',
  styleUrls: ['./bizonylat-egy.component.css']
})
export class BizonylatEgyComponent {
  bizonylatservice: BizonylatService;
  eppFrissit = false;

  constructor(private _projektkapcsolatservice: ProjektkapcsolatService,
              private _bizonylatkifizetesservice: BizonylatkifizetesService,
              private _bizonylatkapcsolatservice: BizonylatkapcsolatService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  vissza() {
    this.bizonylatservice.ContainerMode = BizonylatContainerMode.List;
    this._projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.List;
  }
  reszletek() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Reszletek;
  }
  torles() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Torles;
  }
  modositas() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Modositas;
  }
  nyomtatas() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Nyomtatas;
  }
  kifizetes() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Kifizetes;
    this._bizonylatkifizetesservice.ContainerMode = BizonylatKifizetesContainerMode.List;
  }
  irat() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Irat;
    this._bizonylatkapcsolatservice.ContainerMode = BizonylatKapcsolatContainerMode.List;
  }
}

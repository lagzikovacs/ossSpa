import { Component } from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {BizonylatContainerMode} from '../bizonylatcontainermode';
import {ProjektkapcsolatService} from '../../projekt/bizonylatesirat/projektkapcsolat.service';
import {BizonylatesIratContainerMode} from '../../projekt/bizonylatesirat/bizonylatesiratcontainermode';
import {BizonylatEgyMode} from "../bizonylategymode";

@Component({
  selector: 'app-bizonylat-egy',
  templateUrl: './bizonylat-egy.component.html',
  styleUrls: ['./bizonylat-egy.component.css']
})
export class BizonylatEgyComponent {
  bizonylatservice: BizonylatService;
  eppFrissit = false;

  constructor(private _projektkapcsolatservice: ProjektkapcsolatService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  vissza() {
    this.bizonylatservice.ContainerMode = BizonylatContainerMode.List;
    this._projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.List;
  }
  reszletek() {}
  torles() {}
  modositas() {}
  nyomtatas() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Nyomtatas;
  }
  kifizetes() {}
  irat() {}
}

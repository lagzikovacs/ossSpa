import { Component } from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {BizonylatContainerMode} from "../bizonylatcontainermode";

@Component({
  selector: 'app-bizonylat-egy',
  templateUrl: './bizonylat-egy.component.html',
  styleUrls: ['./bizonylat-egy.component.css']
})
export class BizonylatEgyComponent {
  bizonylatservice: BizonylatService;
  eppFrissit = false;

  constructor(bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  vissza() {
    this.bizonylatservice.ContainerMode = BizonylatContainerMode.List;
  }
  reszletek() {}
  torles() {}
  modositas() {}
  nyomtatas() {}
  tetelek() {}
  kifizetes() {}
  irat() {}
}

import { Component } from '@angular/core';
import {BizonylatService} from "../bizonylat.service";
import {BizonylatSzerkesztesMode} from "../bizonylatszerkesztesmode";

@Component({
  selector: 'app-bizonylat-tetel-szerkesztes',
  templateUrl: './bizonylat-tetel-szerkesztes.component.html',
  styleUrls: ['./bizonylat-tetel-szerkesztes.component.css']
})
export class BizonylatTetelSzerkesztesComponent {
  bizonylatservice: BizonylatService;
  eppFrissit = false;

  constructor(bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  CikkZoom() {}
  MeZoom() {}
  AfaZoom() {}
  TermekdijZoom() {}
  Br() {}

  onSubmit() {
    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.List;
  }
  cancel() {
    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.List;
  }
}

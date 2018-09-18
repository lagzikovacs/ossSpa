import {Component, ViewChild} from '@angular/core';
import {BizonylatkifizetesService} from "../bizonylatkifizetes.service";
import {ErrormodalComponent} from "../../../errormodal/errormodal.component";
import {BizonylatKifizetesContainerMode} from "../bizonylatkifizetescontainermode";
import {BizonylatKifizetesEgyMode} from "../bizonylatkifizetesegymode";

@Component({
  selector: 'app-bizonylat-kifizetes-egy',
  templateUrl: './bizonylat-kifizetes-egy.component.html',
  styleUrls: ['./bizonylat-kifizetes-egy.component.css']
})
export class BizonylatKifizetesEgyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  bizonylatkifizetesservice: BizonylatkifizetesService;
  eppFrissit = false;

  constructor(bizonylatkifizetesservice: BizonylatkifizetesService) {
    this.bizonylatkifizetesservice = bizonylatkifizetesservice;
  }

  vissza() {
    this.bizonylatkifizetesservice.ContainerMode = BizonylatKifizetesContainerMode.List;
  }
  reszletek() {
    this.bizonylatkifizetesservice.EgyMode = BizonylatKifizetesEgyMode.Reszletek;
  }
  torles() {
    this.bizonylatkifizetesservice.EgyMode = BizonylatKifizetesEgyMode.Torles;
  }
  modositas() {
    this.bizonylatkifizetesservice.uj = false;
    this.bizonylatkifizetesservice.DtoEdited = Object.assign({}, this.bizonylatkifizetesservice.Dto[this.bizonylatkifizetesservice.DtoSelectedIndex]);
    this.bizonylatkifizetesservice.EgyMode = BizonylatKifizetesEgyMode.Modositas;
  }
}

import {Component, ViewChild} from '@angular/core';
import {BizonylatkifizetesService} from "../bizonylatkifizetes.service";
import {ErrormodalComponent} from "../../../errormodal/errormodal.component";
import {BizonylatService} from "../../bizonylat.service";
import {LogonService} from "../../../logon/logon.service";
import {BizonylatKifizetesContainerMode} from "../bizonylatkifizetescontainermode";

@Component({
  selector: 'app-bizonylat-kifizetes-list',
  templateUrl: './bizonylat-kifizetes-list.component.html',
  styleUrls: ['./bizonylat-kifizetes-list.component.css']
})
export class BizonylatKifizetesListComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  bizonylatkifizetesservice: BizonylatkifizetesService;
  eppFrissit = false;

  constructor(private _logonservice: LogonService,
              private _bizonylatservice: BizonylatService,
              bizonylatkifizetesservice: BizonylatkifizetesService) {
    this.bizonylatkifizetesservice = bizonylatkifizetesservice;
  }

  kereses() {
    this.eppFrissit = true;
    this.bizonylatkifizetesservice.Select(this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].BIZONYLATKOD)
      .then(res => {
        this.eppFrissit = false;

        this.bizonylatkifizetesservice.Dto = res.Result;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  setClickedRow(i: number) {
    this.bizonylatkifizetesservice.DtoSelectedIndex = i;
    this.bizonylatkifizetesservice.ContainerMode = BizonylatKifizetesContainerMode.Egy;
    // TODO egymode
  }
  uj() {
    this.bizonylatkifizetesservice.ContainerMode = BizonylatKifizetesContainerMode.Uj;
  }
}

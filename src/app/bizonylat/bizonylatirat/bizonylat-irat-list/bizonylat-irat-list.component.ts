import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from "../../../errormodal/errormodal.component";
import {BizonylatkapcsolatService} from "../bizonylatkapcsolat.service";
import {LogonService} from "../../../logon/logon.service";
import {BizonylatKapcsolatContainerMode} from "../bizonylatkapcsolatcontainermode";
import {BizonylatService} from "../../bizonylat.service";

@Component({
  selector: 'app-bizonylat-irat-list',
  templateUrl: './bizonylat-irat-list.component.html',
  styleUrls: ['./bizonylat-irat-list.component.css']
})
export class BizonylatIratListComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  bizonylatkapcsolatservice: BizonylatkapcsolatService;
  eppFrissit = false;

  constructor(private _logonservice: LogonService,
              private _bizonylatservice: BizonylatService,
              bizonylatkapcsolatservice: BizonylatkapcsolatService) {
    this.bizonylatkapcsolatservice = bizonylatkapcsolatservice;
  }

  kereses() {
    this.eppFrissit = true;
    this.bizonylatkapcsolatservice.Select(this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].BIZONYLATKOD)
      .then(res => {
        this.eppFrissit = false;

        this.bizonylatkapcsolatservice.Dto = res.Result;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  levalasztas(i: number) {
    this.bizonylatkapcsolatservice.DtoSelectedIndex = i;
    this.bizonylatkapcsolatservice.ContainerMode = BizonylatKapcsolatContainerMode.Levalasztas;
  }
  setClickedRow(i: number) {
    this.bizonylatkapcsolatservice.DtoSelectedIndex = i;
    // TODO ide az irategy jön
  }
  uj() {
    this.bizonylatkapcsolatservice.ContainerMode = BizonylatKapcsolatContainerMode.Uj;
  }
}

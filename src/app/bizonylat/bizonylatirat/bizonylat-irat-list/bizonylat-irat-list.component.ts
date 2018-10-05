import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from "../../../errormodal/errormodal.component";
import {BizonylatkapcsolatService} from "../bizonylatkapcsolat.service";
import {LogonService} from "../../../logon/logon.service";
import {BizonylatKapcsolatContainerMode} from "../bizonylatkapcsolatcontainermode";
import {BizonylatService} from "../../bizonylat.service";
import {IratService} from "../../../irat/irat/irat.service";
import {IratContainerMode} from "../../../irat/irat/iratcontainermode";
import {IratEgyMode} from "../../../irat/irat/irategymode";
import {DokumentumContainerMode} from "../../../irat/dokumentum/dokumentumcontainermode";
import {DokumentumService} from "../../../irat/dokumentum/dokumentum.service";
import {VagolapService} from "../../../vagolap/vagolap.service";
import {VagolapMode} from "../../../vagolap/vagolapmode";

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
              private _iratservice: IratService,
              private _dokumentumservice: DokumentumService,
              private _vagolapservice: VagolapService,
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

    this.eppFrissit = true;
    this._iratservice.Get(this.bizonylatkapcsolatservice.Dto[this.bizonylatkapcsolatservice.DtoSelectedIndex].IRATKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this._iratservice.Dto = res.Result;
        this._iratservice.DtoSelectedIndex = 0;

        this.bizonylatkapcsolatservice.ContainerMode = BizonylatKapcsolatContainerMode.Egy;
        this._iratservice.ContainerMode = IratContainerMode.List;
        this._iratservice.EgyMode = IratEgyMode.Dokumentum;
        this._dokumentumservice.ContainerMode = DokumentumContainerMode.List;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  uj() {
    this.bizonylatkapcsolatservice.ContainerMode = BizonylatKapcsolatContainerMode.Uj;
  }
  vagolap() {
    this.bizonylatkapcsolatservice.ContainerMode = BizonylatKapcsolatContainerMode.Vagolap;
    this._vagolapservice.Mode = VagolapMode.Bizonylatirat;
  }
}

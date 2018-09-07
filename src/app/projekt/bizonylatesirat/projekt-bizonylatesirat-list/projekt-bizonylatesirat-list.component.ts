import {Component, ViewChild} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {LogonService} from '../../../logon/logon.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {BizonylatesIratContainerMode} from '../bizonylatesiratcontainermode';
import {IratService} from '../../../irat/irat/irat.service';
import {IratContainerMode} from '../../../irat/irat/iratcontainermode';
import {DokumentumContainerMode} from '../../../irat/dokumentum/dokumentumcontainermode';
import {IratEgyMode} from '../../../irat/irat/irategymode';
import {DokumentumService} from '../../../irat/dokumentum/dokumentum.service';
import {AjanlatTetelTipus} from '../ajanlatteteltipus';
import {UjajanlatContainerMode} from "../ujajanlatcontainermode";

@Component({
  selector: 'app-projekt-bizonylatesirat-list',
  templateUrl: './projekt-bizonylatesirat-list.component.html',
  styleUrls: ['./projekt-bizonylatesirat-list.component.css']
})
export class ProjektBizonylatesiratListComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektkapcsolatservice: ProjektkapcsolatService;
  eppFrissit = false;

  constructor(private _logonservice: LogonService,
              private _iratservice: IratService,
              private _dokumentumservice: DokumentumService,
              projektkapcsolatservice: ProjektkapcsolatService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  kereses() {
    this.eppFrissit = true;
    this.projektkapcsolatservice.Kereses()
      .then(res => {
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  levalasztas(i: number) {
    this.projektkapcsolatservice.DtoSelectedIndex = i;
    this.projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.Levalasztas;
  }
  setClickedRow(i: number) {
    this.projektkapcsolatservice.DtoSelectedIndex = i;
    // TODO itt elágazik tipustól függően: BizonylatKod v IratKod

    if (this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].IRATKOD !== null) {
      this._iratservice.Get(this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].IRATKOD)
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this._iratservice.Dto = res.Result;
          this._iratservice.DtoSelectedIndex = 0;

          this.projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.EgyIrat;
          this._iratservice.ContainerMode = IratContainerMode.List;
          this._iratservice.EgyMode = IratEgyMode.Dokumentum;
          this._dokumentumservice.ContainerMode = DokumentumContainerMode.List;
        })
        .catch(err => {
          this.eppFrissit = false;
          this.errormodal.show(err);
        });
    }
  }
  ujbizonylat() {
    this.projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.UjBizonylat;
  }
  ujirat() {
    this.projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.UjIrat;
  }
  ujajanlat() {
    this.eppFrissit = true;
    this.projektkapcsolatservice.AjanlatCreateNew()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.projektkapcsolatservice.AjanlatParam = res.Result;
        this.projektkapcsolatservice.AjanlatNetto = 0;
        this.projektkapcsolatservice.AjanlatAfa = 0;
        this.projektkapcsolatservice.AjanlatBrutto = 0;

        this.eppFrissit = false;
        this.projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.UjAjanlat;
        this.projektkapcsolatservice.AjanlatContainerMode = UjajanlatContainerMode.List;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
}

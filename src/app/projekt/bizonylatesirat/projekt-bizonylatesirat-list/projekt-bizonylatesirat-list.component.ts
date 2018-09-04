import {Component, ViewChild} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {LogonService} from '../../../services/logon.service';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {BizonylatesIratContainerMode} from '../bizonylatesiratcontainermode';
import {IratService} from '../../../irat/irat/irat.service';
import {IratContainerMode} from '../../../irat/irat/iratcontainermode';

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
        this.errormodal.show(err);
        this.eppFrissit = false;
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

          this.projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.EgyIrat;

          this._iratservice.Dto = res.Result;
          this._iratservice.DtoSelectedIndex = 0;
          this._iratservice.ContainerMode = IratContainerMode.List;
        })
        .catch(err => {
          this.errormodal.show(err);
          this.eppFrissit = false;
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
    this.projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.UjAjanlat;
  }
}

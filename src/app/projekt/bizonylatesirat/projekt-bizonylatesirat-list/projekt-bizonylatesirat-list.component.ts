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
import {UjajanlatContainerMode} from '../ujajanlatcontainermode';
import {BizonylatService} from '../../../bizonylat/bizonylat.service';

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
              private _bizonylatservice: BizonylatService,
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

    if (this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].BIZONYLATKOD !== null) {
      this.eppFrissit = true;
      this._bizonylatservice.GetComplex(this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].BIZONYLATKOD)
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this._bizonylatservice.Dto = [res.Result[0].Dto];
          this._bizonylatservice.DtoSelectedIndex = 0;
          this._bizonylatservice.bizonylatTipus = this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].BIZONYLATTIPUSKOD;

          this._bizonylatservice.LstTetelDto = res.Result[0].LstTetelDto;
          this._bizonylatservice.LstAfaDto = res.Result[0].LstAfaDto;
          this._bizonylatservice.LstTermekdijDto = res.Result[0].LstTermekdijDto;

          return this._bizonylatservice.GetBizonylatLeiro();
        })
        .then(res1 => {
          if (res1.Error != null) {
            throw res1.Error;
          }

          this.projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.EgyBizonylat;
          // TODO bizonylat-egy parameterei
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this.errormodal.show(err);
        });
    }

    if (this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].IRATKOD !== null) {
      this.eppFrissit = true;
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
          this.eppFrissit = false;
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

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
import {BizonylatkapcsolatService} from '../../../bizonylat/bizonylatirat/bizonylatkapcsolat.service';
import {BizonylatkifizetesService} from '../../../bizonylat/bizonylatkifizetes/bizonylatkifizetes.service';
import {BizonylatEgyMode} from "../../../bizonylat/bizonylategymode";
import {VagolapService} from "../../../vagolap/vagolap.service";
import {VagolapMode} from "../../../vagolap/vagolapmode";

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
              private _bizonylatkapcsolatservice: BizonylatkapcsolatService,
              private _bizonylatkifizetesservice: BizonylatkifizetesService,
              private _vagolapservice: VagolapService,
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

          this._bizonylatservice.TetelDto = res.Result[0].LstTetelDto;
          this._bizonylatservice.AfaDto = res.Result[0].LstAfaDto;
          this._bizonylatservice.TermekdijDto = res.Result[0].LstTermekdijDto;

          return this._bizonylatservice.GetBizonylatLeiro(); // ez megcsinálja az értékadásokat is
        })
        .then(res1 => {
          if (res1.Error != null) {
            throw res1.Error;
          }

          return this._bizonylatkapcsolatservice.Select(
            this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].BIZONYLATKOD);
        })
        .then(res2 => {
          if (res2.Error != null) {
            throw res2.Error;
          }

          this._bizonylatkapcsolatservice.Dto = res2.Result;
          return this._bizonylatkifizetesservice.Select(
            this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].BIZONYLATKOD);
        })
        .then(res3 => {
          if (res3.Error != null) {
            throw res3.Error;
          }

          this._bizonylatkifizetesservice.Dto = res3.Result;

          this.projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.EgyBizonylat;
          this._bizonylatservice.EgyMode = BizonylatEgyMode.Reszletek;
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
  vagolaprol() {
    this.projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.Vagolap;
    this._vagolapservice.Mode = VagolapMode.Projekt;
  }
}

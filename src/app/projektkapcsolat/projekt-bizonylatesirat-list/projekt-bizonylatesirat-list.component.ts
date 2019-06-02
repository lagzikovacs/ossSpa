import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {LogonService} from '../../logon/logon.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {BizonylatesIratContainerMode} from '../bizonylatesiratcontainermode';
import {IratService} from '../../irat/irat.service';
import {IratContainerMode} from '../../irat/iratcontainermode';
import {DokumentumContainerMode} from '../../dokumentum/dokumentumcontainermode';
import {IratEgyMode} from '../../irat/irategymode';
import {DokumentumService} from '../../dokumentum/dokumentum.service';
import {AjanlatContainerMode} from '../../ajanlat/ajanlatcontainermode';
import {BizonylatService} from '../../bizonylat/bizonylat.service';
import {BizonylatkapcsolatService} from '../../bizonylatkapcsolat/bizonylatkapcsolat.service';
import {BizonylatkifizetesService} from '../../kifizetes/bizonylatkifizetes.service';
import {BizonylatEgyMode} from '../../bizonylat/bizonylategymode';
import {VagolapService} from '../../vagolap/vagolap.service';
import {VagolapMode} from '../../vagolap/vagolapmode';
import {AjanlatService} from '../../ajanlat/ajanlat.service';
import {JogKod} from "../../enums/jogkod";

@Component({
  selector: 'app-projekt-bizonylatesirat-list',
  templateUrl: './projekt-bizonylatesirat-list.component.html',
  styleUrls: ['./projekt-bizonylatesirat-list.component.css']
})
export class ProjektBizonylatesiratListComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektkapcsolatservice: ProjektkapcsolatService;
  eppFrissit = false;

  BizonylatMod = false;
  IratMod = false;
  AjanlatMod = false;

  constructor(private _logonservice: LogonService,
              private _iratservice: IratService,
              private _dokumentumservice: DokumentumService,
              private _bizonylatservice: BizonylatService,
              private _bizonylatkapcsolatservice: BizonylatkapcsolatService,
              private _bizonylatkifizetesservice: BizonylatkifizetesService,
              private _vagolapservice: VagolapService,
              private _ajanlatservice: AjanlatService,
              projektkapcsolatservice: ProjektkapcsolatService) {
    this.BizonylatMod = this._logonservice.Jogaim.includes(JogKod[JogKod.BIZONYLATMOD]);
    this.IratMod = this._logonservice.Jogaim.includes(JogKod[JogKod.IRATMOD]);
    this.AjanlatMod = this._logonservice.Jogaim.includes(JogKod[JogKod.AJANLATKESZITES]);
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

    if (this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].Bizonylatkod !== null) {
      this.eppFrissit = true;
      this._bizonylatservice.GetComplex(this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].Bizonylatkod)
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this._bizonylatservice.Dto = [res.Result[0].Dto];
          this._bizonylatservice.DtoSelectedIndex = 0;
          this._bizonylatservice.bizonylatTipus = this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].Bizonylattipuskod;

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
            this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].Bizonylatkod);
        })
        .then(res2 => {
          if (res2.Error != null) {
            throw res2.Error;
          }

          this._bizonylatkapcsolatservice.Dto = res2.Result;
          return this._bizonylatkifizetesservice.Select(
            this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].Bizonylatkod);
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

    if (this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].Iratkod !== null) {
      this.eppFrissit = true;
      this._iratservice.Get(this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].Iratkod)
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
    this._ajanlatservice.CreateNew()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this._ajanlatservice.AjanlatParam = res.Result;

        this.eppFrissit = false;
        this.projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.UjAjanlat;
        this._ajanlatservice.AjanlatContainerMode = AjanlatContainerMode.List;
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
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

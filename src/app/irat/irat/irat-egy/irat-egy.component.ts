import {Component, ViewChild} from '@angular/core';
import {IratService} from '../irat.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {IratContainerMode} from '../iratcontainermode';
import {IratEgyMode} from '../irategymode';
import {DokumentumService} from '../../dokumentum/dokumentum.service';
import {DokumentumContainerMode} from '../../dokumentum/dokumentumcontainermode';
import {ProjektkapcsolatService} from '../../../projekt/bizonylatesirat/projektkapcsolat.service';
import {BizonylatesIratContainerMode} from '../../../projekt/bizonylatesirat/bizonylatesiratcontainermode';
import {ProjektService} from "../../../projekt/projekt/projekt.service";
import {ProjektResult} from "../../../projekt/projekt/projektresult";

@Component({
  selector: 'app-irat-egy',
  templateUrl: './irat-egy.component.html',
  styleUrls: ['./irat-egy.component.css']
})
export class IratEgyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  iratservice: IratService;
  dokumentumservice: DokumentumService;
  eppFrissit = false;
  nincsProjekt = false;

  constructor(private _projektkapcsolatservice: ProjektkapcsolatService,
              private _projektservice: ProjektService,
              iratservice: IratService,
              dokumentumservice: DokumentumService) {
    this.iratservice = iratservice;
    this.dokumentumservice = dokumentumservice;
  }

  vissza() {
    this._projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.List;
    this.iratservice.ContainerMode = IratContainerMode.List;
    // TODO talán problémát okozhat...
  }
  reszletek() {
    this.iratservice.EgyMode = IratEgyMode.Reszletek;
  }
  torles() {
    this.iratservice.EgyMode = IratEgyMode.Torles;
  }
  modositas() {
    this.iratservice.uj = false;
    this.iratservice.DtoEdited = Object.assign({}, this.iratservice.Dto[this.iratservice.DtoSelectedIndex]);
    this.iratservice.EgyMode = IratEgyMode.Modositas;
  }
  dokumentum() {
    this.iratservice.EgyMode = IratEgyMode.Dokumentum;
    this.dokumentumservice.ContainerMode = DokumentumContainerMode.List;
  }
  projekt() {
    this.eppFrissit = true;
    this._projektkapcsolatservice.SelectByIrat(this.iratservice.Dto[this.iratservice.DtoSelectedIndex].IRATKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (res.Result.length === 0) {
          this.nincsProjekt = true;
          return new Promise<ProjektResult>((resolve, reject) => { resolve(new ProjektResult()); });
        } else {
          this.nincsProjekt = false;
          return this._projektservice.Get(res.Result[0].PROJEKTKOD);
        }
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (!this.nincsProjekt) {
          this._projektservice.Dto = res1.Result;
          this._projektservice.DtoSelectedIndex = 0;
        }

        this.iratservice.EgyMode = IratEgyMode.Projekt;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
}
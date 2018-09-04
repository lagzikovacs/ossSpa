import {Component, ViewChild} from '@angular/core';
import {IratService} from '../irat.service';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {IratContainerMode} from '../iratcontainermode';
import {IratEgyMode} from '../irategymode';
import {DokumentumService} from '../../dokumentum/dokumentum.service';
import {DokumentumContainerMode} from '../../dokumentum/dokumentumcontainermode';
import {ProjektkapcsolatService} from '../../../projekt/bizonylatesirat/projektkapcsolat.service';
import {BizonylatesIratContainerMode} from '../../../projekt/bizonylatesirat/bizonylatesiratcontainermode';

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

  constructor(private _projektkapcsolatservice: ProjektkapcsolatService,
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
}

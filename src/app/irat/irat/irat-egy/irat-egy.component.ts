import {Component, ViewChild} from '@angular/core';
import {IratService} from '../irat.service';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {IratContainerMode} from '../iratcontainermode';
import {IratEgyMode} from '../irategymode';
import {DokumentumService} from '../../dokumentum/dokumentum.service';
import {DokumentumContainerMode} from '../../dokumentum/dokumentumcontainermode';

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

  constructor(iratservice: IratService,
              dokumentumservice: DokumentumService) {
    this.iratservice = iratservice;
    this.dokumentumservice = dokumentumservice;
  }

  vissza() {
    this.iratservice.ContainerMode = IratContainerMode.List;
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

import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {DokumentumService} from '../dokumentum.service';
import {IratService} from '../../irat/irat.service';
import {DokumentumDto} from '../../../dtos/dokumentum/dokumentumdto';
import {DokumentumContainerMode} from '../dokumentumcontainermode';
import {DokumentumEgyMode} from '../dokumentumegymode';

@Component({
  selector: 'app-dokumentum-list',
  templateUrl: './dokumentum-list.component.html',
  styleUrls: ['./dokumentum-list.component.css']
})
export class DokumentumListComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  dokumentumservice: DokumentumService;
  eppFrissit = false;

  constructor(dokumentumservice: DokumentumService,
              private _iratservice: IratService) {
    this.dokumentumservice = dokumentumservice;
  }

  ngOnInit() {
    // TODO hibás állapotok kiszűrése

    this.eppFrissit = true;
    this.dokumentumservice.Dto = DokumentumDto[0];
    this.dokumentumservice.Select(this._iratservice.Dto[this._iratservice.DtoSelectedIndex].IRATKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.dokumentumservice.Dto = res.Result;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  letoltes(i: number) {
  }
  setClickedRow(i: number) {
    this.dokumentumservice.DtoSelectedIndex = i;
    this.dokumentumservice.uj = false;
    this.dokumentumservice.ContainerMode = DokumentumContainerMode.Egy;
    this.dokumentumservice.EgyMode = DokumentumEgyMode.Reszletek;
  }
  feltoltes() {
    // csak h üres rekordot mutasson
    this.dokumentumservice.DtoEdited = new DokumentumDto();
    this.dokumentumservice.uj = true;
    this.dokumentumservice.ContainerMode = DokumentumContainerMode.Feltoltes;
  }
}

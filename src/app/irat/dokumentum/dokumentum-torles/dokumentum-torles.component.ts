import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ErrormodalComponent} from "../../../errormodal/errormodal.component";
import {DokumentumService} from "../dokumentum.service";
import {DokumentumContainerMode} from "../dokumentumcontainermode";
import {DokumentumEgyMode} from "../dokumentumegymode";

@Component({
  selector: 'app-dokumentum-torles',
  templateUrl: './dokumentum-torles.component.html',
  styleUrls: ['./dokumentum-torles.component.css']
})
export class DokumentumTorlesComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  dokumentumservice: DokumentumService;
  eppFrissit = false;

  constructor(dokumentumservice: DokumentumService) {
    this.dokumentumservice = dokumentumservice;
  }

  ok() {
    this.eppFrissit = true;
    this.dokumentumservice.Delete(this.dokumentumservice.Dto[this.dokumentumservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.dokumentumservice.Dto.splice(this.dokumentumservice.DtoSelectedIndex, 1);
        this.dokumentumservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.dokumentumservice.ContainerMode = DokumentumContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this.dokumentumservice.EgyMode = DokumentumEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

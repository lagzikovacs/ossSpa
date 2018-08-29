import {Component, ViewChild} from '@angular/core';
import {CikkService} from '../cikk.service';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {CikkEgyMode} from "../cikkegymode";
import {CikkContainerMode} from "../cikkcontainermode";

@Component({
  selector: 'app-cikk-torles',
  templateUrl: './cikk-torles.component.html',
  styleUrls: ['./cikk-torles.component.css']
})
export class CikkTorlesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  cikkservice: CikkService;
  eppFrissit = false;

  constructor(cikkservice: CikkService) {
    this.cikkservice = cikkservice;
  }

  ok() {
    this.eppFrissit = true;
    this.cikkservice.Delete(this.cikkservice.Dto[this.cikkservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.cikkservice.Dto.splice(this.cikkservice.DtoSelectedIndex, 1);
        this.cikkservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.cikkservice.ContainerMode = CikkContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this.cikkservice.EgyMode = CikkEgyMode.Reszletek;
  }
}

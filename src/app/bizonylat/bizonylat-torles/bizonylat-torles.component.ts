import {Component, ViewChild} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {BizonylatContainerMode} from "../bizonylatcontainermode";
import {BizonylatEgyMode} from "../bizonylategymode";

@Component({
  selector: 'app-bizonylat-torles',
  templateUrl: './bizonylat-torles.component.html',
  styleUrls: ['./bizonylat-torles.component.css']
})
export class BizonylatTorlesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  bizonylatservice: BizonylatService;
  eppFrissit = false;

  constructor(bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  ok() {
    this.eppFrissit = true;
    this.bizonylatservice.Delete(this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatservice.Dto.splice(this.bizonylatservice.DtoSelectedIndex, 1);
        this.bizonylatservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.bizonylatservice.ContainerMode = BizonylatContainerMode.List;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  cancel() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Reszletek;
  }
}

import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {IratService} from '../irat.service';
import {IratContainerMode} from '../iratcontainermode';
import {IratEgyMode} from '../irategymode';

@Component({
  selector: 'app-irat-torles',
  templateUrl: './irat-torles.component.html',
  styleUrls: ['./irat-torles.component.css']
})
export class IratTorlesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  iratservice: IratService;
  eppFrissit = false;

  constructor(iratservice: IratService) {
    this.iratservice = iratservice;
  }

  ok() {
    this.eppFrissit = true;
    this.iratservice.Delete(this.iratservice.Dto[this.iratservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.iratservice.Dto.splice(this.iratservice.DtoSelectedIndex, 1);
        this.iratservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.iratservice.ContainerMode = IratContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this.iratservice.EgyMode = IratEgyMode.Reszletek;
  }
}

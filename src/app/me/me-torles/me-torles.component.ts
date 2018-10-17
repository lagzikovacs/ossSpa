import {Component, OnDestroy, ViewChild} from '@angular/core';
import {MeService} from '../me.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {MeEgyMode} from '../meegymode';
import {MeContainerMode} from '../mecontainermode';

@Component({
  selector: 'app-me-torles',
  templateUrl: './me-torles.component.html',
  styleUrls: ['./me-torles.component.css']
})
export class MeTorlesComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  meservice: MeService;
  eppFrissit = false;

  constructor(meservice: MeService) {
    this.meservice = meservice;
  }

  ok() {
    this.eppFrissit = true;
    this.meservice.Delete(this.meservice.Dto[this.meservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.meservice.Dto.splice(this.meservice.DtoSelectedIndex, 1);
        this.meservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.meservice.ContainerMode = MeContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this.meservice.EgyMode = MeEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

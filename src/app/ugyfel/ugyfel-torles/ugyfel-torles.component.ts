import {Component, ViewChild} from '@angular/core';
import {UgyfelService} from '../ugyfel.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {UgyfelContainerMode} from '../ugyfelcontainermode';
import {UgyfelEgyMode} from '../ugyfelegymode';

@Component({
  selector: 'app-ugyfel-torles',
  templateUrl: './ugyfel-torles.component.html',
  styleUrls: ['./ugyfel-torles.component.css']
})
export class UgyfelTorlesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  ugyfelservice: UgyfelService;
  eppFrissit = false;

  constructor(ugyfelservice: UgyfelService) {
    this.ugyfelservice = ugyfelservice;
  }

  ok() {
    this.eppFrissit = true;
    this.ugyfelservice.Delete(this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.ugyfelservice.Dto.splice(this.ugyfelservice.DtoSelectedIndex, 1);
        this.ugyfelservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.ugyfelservice.ContainerMode = UgyfelContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this.ugyfelservice.EgyMode = UgyfelEgyMode.Reszletek;
  }
}

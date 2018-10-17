import {Component, OnDestroy, ViewChild} from '@angular/core';
import {TeendoService} from '../teendo.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {TeendoContainerMode} from '../teendocontainermode';
import {TeendoEgyMode} from '../teendoegymode';

@Component({
  selector: 'app-teendo-torles',
  templateUrl: './teendo-torles.component.html',
  styleUrls: ['./teendo-torles.component.css']
})
export class TeendoTorlesComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  teendoservice: TeendoService;
  eppFrissit = false;

  constructor(teendoservice: TeendoService) {
    this.teendoservice = teendoservice;
  }

  ok() {
    this.eppFrissit = true;
    this.teendoservice.Delete(this.teendoservice.Dto[this.teendoservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.teendoservice.Dto.splice(this.teendoservice.DtoSelectedIndex, 1);
        this.teendoservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.teendoservice.ContainerMode = TeendoContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this.teendoservice.EgyMode = TeendoEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

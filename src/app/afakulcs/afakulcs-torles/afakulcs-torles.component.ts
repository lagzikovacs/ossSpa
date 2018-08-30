import {Component, ViewChild} from '@angular/core';
import {AfakulcsService} from "../afakulcs.service";
import {ErrormodalComponent} from "../../tools/errormodal/errormodal.component";
import {AfakulcsEgyMode} from "../afakulcsegymode";
import {AfakulcsContainerMode} from "../afakulcscontainermode";

@Component({
  selector: 'app-afakulcs-torles',
  templateUrl: './afakulcs-torles.component.html',
  styleUrls: ['./afakulcs-torles.component.css']
})
export class AfakulcsTorlesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  afakulcsservice: AfakulcsService;
  eppFrissit = false;

  constructor(afakulcsservice: AfakulcsService) {
    this.afakulcsservice = afakulcsservice;
  }

  ok() {
    this.eppFrissit = true;
    this.afakulcsservice.Delete(this.afakulcsservice.Dto[this.afakulcsservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.afakulcsservice.Dto.splice(this.afakulcsservice.DtoSelectedIndex, 1);
        this.afakulcsservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.afakulcsservice.ContainerMode = AfakulcsContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this.afakulcsservice.EgyMode = AfakulcsEgyMode.Reszletek;
  }
}
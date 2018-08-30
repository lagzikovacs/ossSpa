import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from "../../tools/errormodal/errormodal.component";
import {PenztarService} from "../penztar.service";
import {PenztarContainerMode} from "../penztarcontainermode";
import {PenztarEgyMode} from "../penztaregymode";

@Component({
  selector: 'app-penztar-torles',
  templateUrl: './penztar-torles.component.html',
  styleUrls: ['./penztar-torles.component.css']
})
export class PenztarTorlesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  penztarservice: PenztarService;
  eppFrissit = false;

  constructor(penztarservice: PenztarService) {
    this.penztarservice = penztarservice;
  }

  ok() {
    this.eppFrissit = true;
    this.penztarservice.Delete(this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.penztarservice.Dto.splice(this.penztarservice.DtoSelectedIndex, 1);
        this.penztarservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.penztarservice.ContainerMode = PenztarContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this.penztarservice.EgyMode = PenztarEgyMode.Reszletek;
  }
}
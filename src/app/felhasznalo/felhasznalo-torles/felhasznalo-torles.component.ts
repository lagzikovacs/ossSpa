import {Component, ViewChild} from '@angular/core';
import {FelhasznaloService} from '../felhasznalo.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {FelhasznaloContainerMode} from "../felhasznalocontainermode";
import {FelhasznaloEgyMode} from "../felhasznaloegymode";

@Component({
  selector: 'app-felhasznalo-torles',
  templateUrl: './felhasznalo-torles.component.html',
  styleUrls: ['./felhasznalo-torles.component.css']
})
export class FelhasznaloTorlesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  felhasznaloservice: FelhasznaloService;
  eppFrissit = false;

  constructor(felhasznaloservice: FelhasznaloService) {
    this.felhasznaloservice = felhasznaloservice;
  }

  ok() {
    this.eppFrissit = true;
    this.felhasznaloservice.Delete(this.felhasznaloservice.Dto[this.felhasznaloservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.felhasznaloservice.Dto.splice(this.felhasznaloservice.DtoSelectedIndex, 1);
        this.felhasznaloservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.felhasznaloservice.ContainerMode = FelhasznaloContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this.felhasznaloservice.EgyMode = FelhasznaloEgyMode.Reszletek;
  }
}

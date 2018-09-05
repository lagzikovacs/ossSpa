import {Component, ViewChild} from '@angular/core';
import {FizetesimodService} from '../fizetesimod.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {FizetesimodContainerMode} from "../fizetesimodcontainermode";
import {FizetesimodEgyMode} from "../fizetesimodegymode";

@Component({
  selector: 'app-fizetesimod-torles',
  templateUrl: './fizetesimod-torles.component.html',
  styleUrls: ['./fizetesimod-torles.component.css']
})
export class FizetesimodTorlesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  fizetesimodservice: FizetesimodService;
  eppFrissit = false;

  constructor(fizetesimodservice: FizetesimodService) {
    this.fizetesimodservice = fizetesimodservice;
  }

  ok() {
    this.eppFrissit = true;
    this.fizetesimodservice.Delete(this.fizetesimodservice.Dto[this.fizetesimodservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.fizetesimodservice.Dto.splice(this.fizetesimodservice.DtoSelectedIndex, 1);
        this.fizetesimodservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.fizetesimodservice.ContainerMode = FizetesimodContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this.fizetesimodservice.EgyMode = FizetesimodEgyMode.Reszletek;
  }
}

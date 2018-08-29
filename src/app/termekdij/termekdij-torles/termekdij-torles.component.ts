import {Component, ViewChild} from '@angular/core';
import {TermekdijService} from '../termekdij.service';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {TermekdijEgyMode} from "../termekdijegymode";
import {TermekdijContainerMode} from "../termekdijcontainermode";

@Component({
  selector: 'app-termekdij-torles',
  templateUrl: './termekdij-torles.component.html',
  styleUrls: ['./termekdij-torles.component.css']
})
export class TermekdijTorlesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  termekdijservice: TermekdijService;
  eppFrissit = false;

  constructor(termekdijservice: TermekdijService) {
    this.termekdijservice = termekdijservice;
  }

  ok() {
    this.eppFrissit = true;
    this.termekdijservice.Delete(this.termekdijservice.Dto[this.termekdijservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.termekdijservice.Dto.splice(this.termekdijservice.DtoSelectedIndex, 1);
        this.termekdijservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.termekdijservice.ContainerMode = TermekdijContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this.termekdijservice.EgyMode = TermekdijEgyMode.Reszletek;
  }
}

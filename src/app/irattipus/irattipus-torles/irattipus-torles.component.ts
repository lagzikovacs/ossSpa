import {Component, ViewChild} from '@angular/core';
import {IrattipusService} from '../irattipus.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {IrattipusContainerMode} from '../irattipuscontainermode';
import {IrattipusEgyMode} from '../irattipusegymode';

@Component({
  selector: 'app-irattipus-torles',
  templateUrl: './irattipus-torles.component.html',
  styleUrls: ['./irattipus-torles.component.css']
})
export class IrattipusTorlesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  irattipusservice: IrattipusService;
  eppFrissit = false;

  constructor(irattipusservice: IrattipusService) {
    this.irattipusservice = irattipusservice;
  }

  ok() {
    this.eppFrissit = true;
    this.irattipusservice.Delete(this.irattipusservice.Dto[this.irattipusservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.irattipusservice.Dto.splice(this.irattipusservice.DtoSelectedIndex, 1);
        this.irattipusservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.irattipusservice.ContainerMode = IrattipusContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this.irattipusservice.EgyMode = IrattipusEgyMode.Reszletek;
  }
}

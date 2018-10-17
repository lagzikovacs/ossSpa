import {IrattipusService} from '../irattipus.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {Component, OnDestroy, ViewChild} from '@angular/core';
import {NumberResult} from '../../dtos/numberresult';
import {IrattipusContainerMode} from '../irattipuscontainermode';
import {IrattipusEgyMode} from '../irattipusegymode';

@Component({
  selector: 'app-irattipus-szerkesztes',
  templateUrl: './irattipus-szerkesztes.component.html',
  styleUrls: ['./irattipus-szerkesztes.component.css']
})
export class IrattipusSzerkesztesComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  irattipusservice: IrattipusService;
  eppFrissit = false;

  constructor(irattipusservice: IrattipusService) {
    this.irattipusservice = irattipusservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.irattipusservice.uj) {
      p = this.irattipusservice.Add(this.irattipusservice.DtoEdited);
    } else {
      p = this.irattipusservice.Update(this.irattipusservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.irattipusservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.irattipusservice.uj) {
          this.irattipusservice.Dto.unshift(res1.Result[0]);
        } else {
          this.irattipusservice.Dto[this.irattipusservice.DtoSelectedIndex] = res1.Result[0];
        }

        this.eppFrissit = false;
        this.navigal();
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    if (this.irattipusservice.uj) {
      this.irattipusservice.ContainerMode = IrattipusContainerMode.List;
    } else {
      this.irattipusservice.EgyMode = IrattipusEgyMode.Reszletek;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

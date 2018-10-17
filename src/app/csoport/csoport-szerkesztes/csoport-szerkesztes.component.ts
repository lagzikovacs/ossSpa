import {Component, OnDestroy, ViewChild} from '@angular/core';
import {CsoportService} from '../csoport.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {NumberResult} from '../../dtos/numberresult';
import {CsoportContainerMode} from '../csoportcontainermode';
import {CsoportEgyMode} from '../csoportegymode';

@Component({
  selector: 'app-csoport-szerkesztes',
  templateUrl: './csoport-szerkesztes.component.html',
  styleUrls: ['./csoport-szerkesztes.component.css']
})
export class CsoportSzerkesztesComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  csoportservice: CsoportService;
  eppFrissit = false;

  constructor(csoportservice: CsoportService) {
    this.csoportservice = csoportservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.csoportservice.uj) {
      p = this.csoportservice.Add(this.csoportservice.DtoEdited);
    } else {
      p = this.csoportservice.Update(this.csoportservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.csoportservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.csoportservice.uj) {
          this.csoportservice.Dto.unshift(res1.Result[0]);
        } else {
          this.csoportservice.Dto[this.csoportservice.DtoSelectedIndex] = res1.Result[0];
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
    if (this.csoportservice.uj) {
      this.csoportservice.ContainerMode = CsoportContainerMode.List;
    } else {
      this.csoportservice.EgyMode = CsoportEgyMode.Reszletek;
    }
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

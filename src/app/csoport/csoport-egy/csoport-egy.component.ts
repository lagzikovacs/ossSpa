import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {CsoportService} from '../csoport.service';
import {CsoportContainerMode} from '../csoportcontainermode';
import {CsoportEgyMode} from '../csoportegymode';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-csoport-egy',
  templateUrl: './csoport-egy.component.html',
  animations: [rowanimation]
})
export class CsoportEgyComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  csoportservice: CsoportService;
  eppFrissit = false;
  ri = -1;

  constructor(csoportservice: CsoportService) {
    this.csoportservice = csoportservice;
  }

  vissza() {
    this.csoportservice.ContainerMode = CsoportContainerMode.List;
  }
  reszletek() {
    this.csoportservice.EgyMode = CsoportEgyMode.Reszletek;
  }
  torles () {
    this.csoportservice.EgyMode = CsoportEgyMode.Torles;
  }
  modositas() {
    this.csoportservice.uj = false;
    this.csoportservice.DtoEdited = Object.assign({}, this.csoportservice.Dto[this.csoportservice.DtoSelectedIndex]);
    this.csoportservice.EgyMode = CsoportEgyMode.Modositas;
  }
  felhasznalo() {
    this.csoportservice.EgyMode = CsoportEgyMode.Felhasznalo;
  }
  jog() {
    this.csoportservice.EgyMode = CsoportEgyMode.Jog;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.csoportservice.Delete(this.csoportservice.Dto[this.csoportservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.csoportservice.Dto.splice(this.csoportservice.DtoSelectedIndex, 1);
        this.csoportservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.csoportservice.ContainerMode = CsoportContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  TorlesCancel() {
    this.csoportservice.EgyMode = CsoportEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

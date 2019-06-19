import {Component, OnDestroy} from '@angular/core';
import {CsoportService} from '../csoport.service';
import {CsoportContainerMode} from '../csoportcontainermode';
import {CsoportEgyMode} from '../csoportegymode';
import {rowanimation} from '../../animation/rowAnimation';
import {deepCopy} from '../../tools/deepCopy';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-csoport-egy',
  templateUrl: './csoport-egy.component.html',
  animations: [rowanimation]
})
export class CsoportEgyComponent implements OnDestroy {

  csoportservice: CsoportService;
  eppFrissit = false;
  ri = -1;

  constructor(csoportservice: CsoportService,
              private _errorservice: ErrorService) {
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
    this.csoportservice.DtoEdited = deepCopy(this.csoportservice.Dto[this.csoportservice.DtoSelectedIndex]);
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
        this.eppFrissit = false;
        this._errorservice.Error = err;
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

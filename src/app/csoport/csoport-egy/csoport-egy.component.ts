import {Component, OnDestroy} from '@angular/core';
import {CsoportService} from '../csoport.service';
import {CsoportContainerMode} from '../csoportcontainermode';
import {CsoportEgyMode} from '../csoportegymode';
import {rowanimation} from '../../animation/rowAnimation';
import {deepCopy} from '../../tools/deepCopy';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-csoport-egy',
  templateUrl: './csoport-egy.component.html',
  animations: [rowanimation]
})
export class CsoportEgyComponent implements OnDestroy {
  csoportservice: CsoportService;
  ri = -1;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              csoportservice: CsoportService) {
    this.csoportservice = csoportservice;
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

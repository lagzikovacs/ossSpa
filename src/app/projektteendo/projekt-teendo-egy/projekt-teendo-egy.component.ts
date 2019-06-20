import {Component, OnDestroy} from '@angular/core';
import {ProjektteendoService} from '../projektteendo.service';
import {ProjektteendoContainerMode} from '../projektteendocontainermode';
import {ProjektteendoEgyMode} from '../projekttendoegymode';
import {rowanimation} from '../../animation/rowAnimation';
import {deepCopy} from '../../tools/deepCopy';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-projekt-teendo-egy',
  templateUrl: './projekt-teendo-egy.component.html',
  animations: [rowanimation]
})
export class ProjektTeendoEgyComponent implements OnDestroy {
  projektteendoservice: ProjektteendoService;
  ri = -1;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(projektteendoservice: ProjektteendoService,
              private _spinnerservice: SpinnerService,
              private _errorservice: ErrorService) {
    this.projektteendoservice = projektteendoservice;
  }

  vissza() {
    this.projektteendoservice.ContainerMode = ProjektteendoContainerMode.List;
  }
  reszletek() {
    this.projektteendoservice.EgyMode = ProjektteendoEgyMode.Reszletek;
  }
  torles () {
    this.projektteendoservice.EgyMode = ProjektteendoEgyMode.Torles;
  }
  modositas() {
    this.projektteendoservice.uj = false;
    this.projektteendoservice.DtoEdited = deepCopy(this.projektteendoservice.Dto[this.projektteendoservice.DtoSelectedIndex]);
    this.projektteendoservice.EgyMode = ProjektteendoEgyMode.Modositas;
  }
  elvegezve() {
    this.projektteendoservice.uj = false;
    this.projektteendoservice.DtoEdited = deepCopy(this.projektteendoservice.Dto[this.projektteendoservice.DtoSelectedIndex]);
    this.projektteendoservice.EgyMode = ProjektteendoEgyMode.Elvegezve;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.projektteendoservice.Delete(this.projektteendoservice.Dto[this.projektteendoservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.projektteendoservice.Dto.splice(this.projektteendoservice.DtoSelectedIndex, 1);
        this.projektteendoservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.projektteendoservice.ContainerMode = ProjektteendoContainerMode.List;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  TorlesCancel() {
    this.projektteendoservice.EgyMode = ProjektteendoEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

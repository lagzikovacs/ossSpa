import {Component, OnDestroy} from '@angular/core';
import {KifizetesService} from '../kifizetes.service';
import {KifizetesContainerMode} from '../kifizetescontainermode';
import {KifizetesEgyMode} from '../kifizetesegymode';
import {rowanimation} from '../../animation/rowAnimation';
import {deepCopy} from '../../tools/deepCopy';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-kifizetes-egy',
  templateUrl: './kifizetes-egy.component.html',
  animations: [rowanimation]
})
export class KifizetesEgyComponent implements OnDestroy {
  bizonylatkifizetesservice: KifizetesService;
  ri = -1;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(bizonylatkifizetesservice: KifizetesService,
              private _spinnerservice: SpinnerService,
              private _errorservice: ErrorService) {
    this.bizonylatkifizetesservice = bizonylatkifizetesservice;
  }

  reszletek() {
    this.bizonylatkifizetesservice.EgyMode = KifizetesEgyMode.Reszletek;
  }
  torles() {
    this.bizonylatkifizetesservice.EgyMode = KifizetesEgyMode.Torles;
  }
  modositas() {
    this.bizonylatkifizetesservice.uj = false;
    this.bizonylatkifizetesservice.DtoEdited =
      deepCopy(this.bizonylatkifizetesservice.Dto[this.bizonylatkifizetesservice.DtoSelectedIndex]);
    this.bizonylatkifizetesservice.EgyMode = KifizetesEgyMode.Modositas;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.bizonylatkifizetesservice.Delete(this.bizonylatkifizetesservice.Dto[this.bizonylatkifizetesservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatkifizetesservice.Dto.splice(this.bizonylatkifizetesservice.DtoSelectedIndex, 1);
        this.bizonylatkifizetesservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.bizonylatkifizetesservice.ContainerMode = KifizetesContainerMode.List;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  TorlesCancel() {
    this.bizonylatkifizetesservice.EgyMode = KifizetesEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

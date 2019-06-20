import {Component, OnDestroy} from '@angular/core';
import {MeService} from '../me.service';
import {MeContainerMode} from '../mecontainermode';
import {MeEgyMode} from '../meegymode';
import {rowanimation} from '../../../animation/rowAnimation';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {deepCopy} from '../../../tools/deepCopy';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';

@Component({
  selector: 'app-me-egy',
  templateUrl: './me-egy.component.html',
  animations: [rowanimation]
})
export class MeEgyComponent implements OnDestroy {
  meservice: MeService;
  mod = false;
  ri = -1;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              meservice: MeService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.meservice = meservice;
  }

  vissza() {
    this.meservice.ContainerMode = MeContainerMode.List;
  }
  reszletek() {
    this.meservice.EgyMode = MeEgyMode.Reszletek;
  }
  torles () {
    this.meservice.EgyMode = MeEgyMode.Torles;
  }
  modositas() {
    this.meservice.uj = false;
    this.meservice.DtoEdited = deepCopy(this.meservice.Dto[this.meservice.DtoSelectedIndex]);
    this.meservice.EgyMode = MeEgyMode.Modositas;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.meservice.Delete(this.meservice.Dto[this.meservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.meservice.Dto.splice(this.meservice.DtoSelectedIndex, 1);
        this.meservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.meservice.ContainerMode = MeContainerMode.List;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  TorlesCancel() {
    this.meservice.EgyMode = MeEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

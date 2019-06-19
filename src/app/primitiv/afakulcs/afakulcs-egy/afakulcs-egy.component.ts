import {Component, OnDestroy} from '@angular/core';
import {AfakulcsService} from '../afakulcs.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {AfakulcsContainerMode} from '../afakulcscontainermode';
import {AfakulcsEgyMode} from '../afakulcsegymode';
import {rowanimation} from '../../../animation/rowAnimation';
import {deepCopy} from '../../../tools/deepCopy';
import {ErrorService} from '../../../tools/errorbox/error.service';

@Component({
  selector: 'app-afakulcs-egy',
  templateUrl: './afakulcs-egy.component.html',
  animations: [rowanimation]
})
export class AfakulcsEgyComponent implements OnDestroy {
  afakulcsservice: AfakulcsService;
  mod = false;
  eppFrissit = false;
  ri = -1;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              afakulcsservice: AfakulcsService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.afakulcsservice = afakulcsservice;
  }

  vissza() {
    this.afakulcsservice.ContainerMode = AfakulcsContainerMode.List;
  }
  reszletek() {
    this.afakulcsservice.EgyMode = AfakulcsEgyMode.Reszletek;
  }
  torles () {
    this.afakulcsservice.EgyMode = AfakulcsEgyMode.Torles;
  }
  modositas() {
    this.afakulcsservice.uj = false;
    this.afakulcsservice.DtoEdited = deepCopy(this.afakulcsservice.Dto[this.afakulcsservice.DtoSelectedIndex]);
    this.afakulcsservice.EgyMode = AfakulcsEgyMode.Modositas;
  }

  TorlesOk() {
    this.eppFrissit = true;

    this.afakulcsservice.Delete(this.afakulcsservice.Dto[this.afakulcsservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.afakulcsservice.Dto.splice(this.afakulcsservice.DtoSelectedIndex, 1);
        this.afakulcsservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.afakulcsservice.ContainerMode = AfakulcsContainerMode.List;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  TorlesCancel() {
    this.afakulcsservice.EgyMode = AfakulcsEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

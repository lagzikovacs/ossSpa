import {Component, OnDestroy} from '@angular/core';
import {PenznemService} from '../penznem.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {PenznemContainerMode} from '../penznemcontainermode';
import {PenznemEgyMode} from '../penznemegymode';
import {rowanimation} from '../../../animation/rowAnimation';
import {deepCopy} from '../../../tools/deepCopy';
import {ErrorService} from '../../../tools/errorbox/error.service';

@Component({
  selector: 'app-penznem-egy',
  templateUrl: './penznem-egy.component.html',
  animations: [rowanimation]
})
export class PenznemEgyComponent implements OnDestroy {
  penznemservice: PenznemService;
  mod = false;
  eppFrissit = false;
  ri = -1;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              penznemservice: PenznemService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.penznemservice = penznemservice;
  }

  vissza() {
    this.penznemservice.ContainerMode = PenznemContainerMode.List;
  }
  reszletek() {
    this.penznemservice.EgyMode = PenznemEgyMode.Reszletek;
  }
  torles () {
    this.penznemservice.EgyMode = PenznemEgyMode.Torles;
  }
  modositas() {
    this.penznemservice.uj = false;
    this.penznemservice.DtoEdited = deepCopy(this.penznemservice.Dto[this.penznemservice.DtoSelectedIndex]);
    this.penznemservice.EgyMode = PenznemEgyMode.Modositas;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.penznemservice.Delete(this.penznemservice.Dto[this.penznemservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.penznemservice.Dto.splice(this.penznemservice.DtoSelectedIndex, 1);
        this.penznemservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.penznemservice.ContainerMode = PenznemContainerMode.List;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  TorlesCancel() {
    this.penznemservice.EgyMode = PenznemEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

import {Component, OnDestroy} from '@angular/core';
import {TermekdijService} from '../termekdij.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {TermekdijContainerMode} from '../termekdijcontainermode';
import {TermekdijEgyMode} from '../termekdijegymode';
import {rowanimation} from '../../../animation/rowAnimation';
import {deepCopy} from '../../../tools/deepCopy';
import {ErrorService} from '../../../tools/errorbox/error.service';

@Component({
  selector: 'app-termekdij-egy',
  templateUrl: './termekdij-egy.component.html',
  animations: [rowanimation]
})
export class TermekdijEgyComponent implements OnDestroy {
  termekdijservice: TermekdijService;
  mod = false;
  eppFrissit = false;
  ri = -1;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              termekdijservice: TermekdijService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.termekdijservice = termekdijservice;
  }

  vissza() {
    this.termekdijservice.ContainerMode = TermekdijContainerMode.List;
  }
  reszletek() {
    this.termekdijservice.EgyMode = TermekdijEgyMode.Reszletek;
  }
  torles () {
    this.termekdijservice.EgyMode = TermekdijEgyMode.Torles;
  }
  modositas() {
    this.termekdijservice.uj = false;
    this.termekdijservice.DtoEdited = deepCopy(this.termekdijservice.Dto[this.termekdijservice.DtoSelectedIndex]);
    this.termekdijservice.EgyMode = TermekdijEgyMode.Modositas;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.termekdijservice.Delete(this.termekdijservice.Dto[this.termekdijservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.termekdijservice.Dto.splice(this.termekdijservice.DtoSelectedIndex, 1);
        this.termekdijservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.termekdijservice.ContainerMode = TermekdijContainerMode.List;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  TorlesCancel() {
    this.termekdijservice.EgyMode = TermekdijEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

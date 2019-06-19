import {Component, OnDestroy} from '@angular/core';
import {FizetesimodService} from '../fizetesimod.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {FizetesimodContainerMode} from '../fizetesimodcontainermode';
import {FizetesimodEgyMode} from '../fizetesimodegymode';
import {rowanimation} from '../../../animation/rowAnimation';
import {deepCopy} from '../../../tools/deepCopy';
import {ErrorService} from '../../../tools/errorbox/error.service';

@Component({
  selector: 'app-fizetesimod-egy',
  templateUrl: './fizetesimod-egy.component.html',
  animations: [rowanimation]
})
export class FizetesimodEgyComponent implements OnDestroy {
  fizetesimodservice: FizetesimodService;
  mod = false;
  eppFrissit = false;
  ri = -1;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              fizetesimodservice: FizetesimodService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.fizetesimodservice = fizetesimodservice;
  }

  vissza() {
    this.fizetesimodservice.ContainerMode = FizetesimodContainerMode.List;
  }
  reszletek() {
    this.fizetesimodservice.EgyMode = FizetesimodEgyMode.Reszletek;
  }
  torles () {
    this.fizetesimodservice.EgyMode = FizetesimodEgyMode.Torles;
  }
  modositas() {
    this.fizetesimodservice.uj = false;
    this.fizetesimodservice.DtoEdited = deepCopy(this.fizetesimodservice.Dto[this.fizetesimodservice.DtoSelectedIndex]);
    this.fizetesimodservice.EgyMode = FizetesimodEgyMode.Modositas;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.fizetesimodservice.Delete(this.fizetesimodservice.Dto[this.fizetesimodservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.fizetesimodservice.Dto.splice(this.fizetesimodservice.DtoSelectedIndex, 1);
        this.fizetesimodservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.fizetesimodservice.ContainerMode = FizetesimodContainerMode.List;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  TorlesCancel() {
    this.fizetesimodservice.EgyMode = FizetesimodEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

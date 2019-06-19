import {Component, OnDestroy} from '@angular/core';
import {HelysegService} from '../helyseg.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {HelysegContainerMode} from '../helysegcontainermode';
import {HelysegEgyMode} from '../helysegegymode';
import {rowanimation} from '../../../animation/rowAnimation';
import {deepCopy} from '../../../tools/deepCopy';
import {ErrorService} from '../../../tools/errorbox/error.service';

@Component({
  selector: 'app-helyseg-egy',
  templateUrl: './helyseg-egy.component.html',
  animations: [rowanimation]
})
export class HelysegEgyComponent implements OnDestroy {
  helysegservice: HelysegService;
  mod = false;
  eppFrissit = false;
  ri = -1;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              helysegservice: HelysegService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.helysegservice = helysegservice;
  }

  vissza() {
    this.helysegservice.ContainerMode = HelysegContainerMode.List;
  }
  reszletek() {
    this.helysegservice.EgyMode = HelysegEgyMode.Reszletek;
  }
  torles () {
    this.helysegservice.EgyMode = HelysegEgyMode.Torles;
  }
  modositas() {
    this.helysegservice.uj = false;
    this.helysegservice.DtoEdited = deepCopy(this.helysegservice.Dto[this.helysegservice.DtoSelectedIndex]);
    this.helysegservice.EgyMode = HelysegEgyMode.Modositas;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.helysegservice.Delete(this.helysegservice.Dto[this.helysegservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.helysegservice.Dto.splice(this.helysegservice.DtoSelectedIndex, 1);
        this.helysegservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.helysegservice.ContainerMode = HelysegContainerMode.List;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  TorlesCancel() {
    this.helysegservice.EgyMode = HelysegEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

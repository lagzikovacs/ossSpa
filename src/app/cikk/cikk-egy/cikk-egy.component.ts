import {Component, OnDestroy} from '@angular/core';
import {CikkService} from '../cikk.service';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {CikkMozgasParameter} from '../cikkmozgasparameter';
import {CikkContainerMode} from '../cikkcontainermode';
import {CikkEgyMode} from '../cikkegymode';
import {CikkSzerkesztesMode} from '../cikkszerkesztesmode';
import {rowanimation} from '../../animation/rowAnimation';
import {deepCopy} from '../../tools/deepCopy';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-cikk-egy',
  templateUrl: './cikk-egy.component.html',
  animations: [rowanimation]
})
export class CikkEgyComponent implements OnDestroy {

  cikkservice: CikkService;
  mod = false;
  eppFrissit = false;
  ri = -1;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              cikkservice: CikkService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.CIKKMOD]);
    this.cikkservice = cikkservice;
  }

  vissza() {
    this.cikkservice.ContainerMode = CikkContainerMode.List;
  }
  reszletek() {
    this.cikkservice.EgyMode = CikkEgyMode.Reszletek;
  }
  torles () {
    this.cikkservice.EgyMode = CikkEgyMode.Torles;
  }
  modositas() {
    this.cikkservice.uj = false;
    this.cikkservice.DtoEdited = deepCopy(this.cikkservice.Dto[this.cikkservice.DtoSelectedIndex]);
    this.cikkservice.EgyMode = CikkEgyMode.Modositas;
    this.cikkservice.SzerkesztesMode = CikkSzerkesztesMode.Blank;
  }
  beszerzes() {
    this.cikkservice.BizonylattipusKod = 3;
    this.beszerzeskivet();
  }
  kivet() {
    this.cikkservice.BizonylattipusKod = 2;
    this.beszerzeskivet();
  }
  beszerzeskivet() {
    this.eppFrissit = true;
    this.cikkservice.Mozgas(new CikkMozgasParameter(this.cikkservice.Dto[this.cikkservice.DtoSelectedIndex].Cikkkod,
      this.cikkservice.BizonylattipusKod))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.cikkservice.MozgasDto = res.Result;

        this.eppFrissit = false;
        this.cikkservice.EgyMode = CikkEgyMode.BeszerzesKivet;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.cikkservice.Delete(this.cikkservice.Dto[this.cikkservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.cikkservice.Dto.splice(this.cikkservice.DtoSelectedIndex, 1);
        this.cikkservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.cikkservice.ContainerMode = CikkContainerMode.List;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  TorlesCancel() {
    this.cikkservice.EgyMode = CikkEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

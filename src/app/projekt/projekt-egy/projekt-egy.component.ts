import {Component, OnDestroy} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {ProjektContainerMode} from '../projektcontainermode';
import {ProjektEgyMode} from '../projektegymode';
import {ProjektteendoService} from '../../projektteendo/projektteendo.service';
import {SzamlazasirendService} from '../../szamlazasirend/szamlazasirend.service';
import {ProjektkapcsolatService} from '../../projektkapcsolat/projektkapcsolat.service';
import {BizonylatesIratContainerMode} from '../../projektkapcsolat/bizonylatesiratcontainermode';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {rowanimation} from '../../animation/rowAnimation';
import {deepCopy} from '../../tools/deepCopy';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-projekt-egy',
  templateUrl: './projekt-egy.component.html',
  animations: [rowanimation]
})
export class ProjektEgyComponent implements OnDestroy {
  projektservice: ProjektService;
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
              private _projektkapcsolatservice: ProjektkapcsolatService,
              private _szamlazasirendservice: SzamlazasirendService,
              private _projektteendoservice: ProjektteendoService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              projektservice: ProjektService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PROJEKTMOD]);
    this.projektservice = projektservice;
  }

  reszletek() {
    this.projektservice.EgyMode = ProjektEgyMode.Reszletek;
  }
  torles () {
    this.projektservice.EgyMode = ProjektEgyMode.Torles;
  }
  modositas() {
    this.projektservice.uj = false;
    this.projektservice.DtoEdited = deepCopy(this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);
    this.projektservice.EgyMode = ProjektEgyMode.Modositas;
  }

  stsz() {
    this.projektservice.uj = false;
    this.projektservice.DtoEdited = deepCopy(this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);
    this.projektservice.EgyMode = ProjektEgyMode.Statusz;
  }
  muszakiallapot() {
    this.projektservice.uj = false;
    this.projektservice.DtoEdited = deepCopy(this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);
    this.projektservice.EgyMode = ProjektEgyMode.Muszakiallapot;
  }
  inverter() {
    this.projektservice.uj = false;
    this.projektservice.DtoEdited = deepCopy(this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);
    this.projektservice.EgyMode = ProjektEgyMode.Inverter;
  }
  napelem() {
    this.projektservice.uj = false;
    this.projektservice.DtoEdited = deepCopy(this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);
    this.projektservice.EgyMode = ProjektEgyMode.Napelem;
  }
  iratminta() {
    this.projektservice.EgyMode = ProjektEgyMode.Iratminta;
  }
  datumok() {
    this.projektservice.uj = false;
    this.projektservice.DtoEdited = deepCopy(this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);
    this.projektservice.EgyMode = ProjektEgyMode.Datumok;
  }
  bizonylatesirat() {
    this.projektservice.EgyMode = ProjektEgyMode.Bizonylatesirat;
    this._projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.List;
  }
  szamlazasirend() {
    this.projektservice.EgyMode = ProjektEgyMode.Szamlazasirend;
  }
  teendo() {
    this.projektservice.EgyMode = ProjektEgyMode.Teendo;
  }

  SegedOk() {
    this.eppFrissit = true;
    this.projektservice.Update(this.projektservice.DtoEdited)
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        return this.projektservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        this.projektservice.Dto[this.projektservice.DtoSelectedIndex] = res1.Result[0];

        this.eppFrissit = false;
        this.projektservice.EgyMode = ProjektEgyMode.Reszletek;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  SegedCancel() {
    this.projektservice.EgyMode = ProjektEgyMode.Reszletek;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.projektservice.Delete(this.projektservice.Dto[this.projektservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.projektservice.Dto.splice(this.projektservice.DtoSelectedIndex, 1);
        this.projektservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.projektservice.ContainerMode = ProjektContainerMode.List;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  TorlesCancel() {
    this.projektservice.EgyMode = ProjektEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

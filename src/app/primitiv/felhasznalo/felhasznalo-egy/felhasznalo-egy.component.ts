import {Component, OnDestroy} from '@angular/core';
import {FelhasznaloService} from '../felhasznalo.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {FelhasznaloContainerMode} from '../felhasznalocontainermode';
import {FelhasznaloEgyMode} from '../felhasznaloegymode';
import {EsemenynaploService} from '../../../esemenynaplo/esemenynaplo.service';
import {rowanimation} from '../../../animation/rowAnimation';
import {deepCopy} from '../../../tools/deepCopy';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';

@Component({
  selector: 'app-felhasznalo-egy',
  templateUrl: './felhasznalo-egy.component.html',
  animations: [rowanimation]
})
export class FelhasznaloEgyComponent implements OnDestroy {
  felhasznaloservice: FelhasznaloService;
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
              private _esemenynaploservice: EsemenynaploService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              felhasznaloservice: FelhasznaloService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.FELHASZNALOMOD]);
    this.felhasznaloservice = felhasznaloservice;
  }

  reszletek() {
    this.felhasznaloservice.EgyMode = FelhasznaloEgyMode.Reszletek;
  }
  torles () {
    this.felhasznaloservice.EgyMode = FelhasznaloEgyMode.Torles;
  }
  modositas() {
    this.felhasznaloservice.uj = false;
    this.felhasznaloservice.DtoEdited = deepCopy(this.felhasznaloservice.Dto[this.felhasznaloservice.DtoSelectedIndex]);
    this.felhasznaloservice.EgyMode = FelhasznaloEgyMode.Modositas;
  }
  jelszo() {
    this.felhasznaloservice.EgyMode = FelhasznaloEgyMode.Jelszo;
  }
  tevekenyseg() {
    this._esemenynaploservice.Felhasznalokod = this.felhasznaloservice.Dto[this.felhasznaloservice.DtoSelectedIndex].Felhasznalokod;
    this.felhasznaloservice.EgyMode = FelhasznaloEgyMode.Tevekenyseg;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.felhasznaloservice.Delete(this.felhasznaloservice.Dto[this.felhasznaloservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.felhasznaloservice.Dto.splice(this.felhasznaloservice.DtoSelectedIndex, 1);
        this.felhasznaloservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.felhasznaloservice.ContainerMode = FelhasznaloContainerMode.List;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  TorlesCancel() {
    this.felhasznaloservice.EgyMode = FelhasznaloEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

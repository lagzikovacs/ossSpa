import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {FelhasznaloService} from '../felhasznalo.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {EsemenynaploService} from '../../../esemenynaplo/esemenynaplo.service';
import {rowanimation} from '../../../animation/rowAnimation';
import {deepCopy} from '../../../tools/deepCopy';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {EgyMode} from '../../../enums/egymode';

@Component({
  selector: 'app-felhasznalo-egy',
  templateUrl: './felhasznalo-egy.component.html',
  animations: [rowanimation]
})
export class FelhasznaloEgyComponent implements OnDestroy {
  egymode = EgyMode.Reszletek;
  felhasznaloservice: FelhasznaloService;
  mod = false;
  ri = -1;

  @Output() torlesutan = new EventEmitter<void>();

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
    this.egymode = EgyMode.Reszletek;
  }
  torles () {
    this.egymode = EgyMode.Torles;
  }
  modositas() {
    this.felhasznaloservice.uj = false;
    this.felhasznaloservice.DtoEdited = deepCopy(this.felhasznaloservice.Dto[this.felhasznaloservice.DtoSelectedIndex]);
    this.egymode = EgyMode.Modositas;
  }
  jelszo() {
    this.egymode = EgyMode.Jelszo;
  }
  tevekenyseg() {
    this._esemenynaploservice.Felhasznalokod = this.felhasznaloservice.Dto[this.felhasznaloservice.DtoSelectedIndex].Felhasznalokod;
    this.egymode = EgyMode.Tevekenyseg;
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
        this.torlesutan.emit();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  TorlesCancel() {
    this.egymode = EgyMode.Reszletek;
  }

  EgyReszletek() {
    this.egymode = EgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

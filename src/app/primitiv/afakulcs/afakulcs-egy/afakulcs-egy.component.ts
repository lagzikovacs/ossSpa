import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {AfakulcsService} from '../afakulcs.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {rowanimation} from '../../../animation/rowAnimation';
import {deepCopy} from '../../../tools/deepCopy';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {EgyMode} from '../../../enums/egymode';

@Component({
  selector: 'app-afakulcs-egy',
  templateUrl: './afakulcs-egy.component.html',
  animations: [rowanimation]
})
export class AfakulcsEgyComponent implements OnDestroy {
  egymode = EgyMode.Reszletek;
  afakulcsservice: AfakulcsService;
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
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              afakulcsservice: AfakulcsService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.afakulcsservice = afakulcsservice;
  }

  reszletek() {
    this.egymode = EgyMode.Reszletek;
  }
  torles () {
    this.egymode = EgyMode.Torles;
  }
  modositas() {
    this.afakulcsservice.uj = false;
    this.afakulcsservice.DtoEdited = deepCopy(this.afakulcsservice.Dto[this.afakulcsservice.DtoSelectedIndex]);

    this.egymode = EgyMode.Modositas;
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

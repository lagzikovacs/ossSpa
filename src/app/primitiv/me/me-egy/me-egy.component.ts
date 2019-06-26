import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {MeService} from '../me.service';
import {rowanimation} from '../../../animation/rowAnimation';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {deepCopy} from '../../../tools/deepCopy';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {EgyMode} from '../../../enums/egymode';

@Component({
  selector: 'app-me-egy',
  templateUrl: './me-egy.component.html',
  animations: [rowanimation]
})
export class MeEgyComponent implements OnDestroy {
  egymode = EgyMode.Reszletek;
  meservice: MeService;
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
              meservice: MeService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.meservice = meservice;
  }

  reszletek() {
    this.egymode = EgyMode.Reszletek;
  }
  torles () {
    this.egymode = EgyMode.Torles;
  }
  modositas() {
    this.meservice.uj = false;
    this.meservice.DtoEdited = deepCopy(this.meservice.Dto[this.meservice.DtoSelectedIndex]);
    this.egymode = EgyMode.Modositas;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.meservice.Delete(this.meservice.Dto[this.meservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.meservice.Dto.splice(this.meservice.DtoSelectedIndex, 1);
        this.meservice.DtoSelectedIndex = -1;

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

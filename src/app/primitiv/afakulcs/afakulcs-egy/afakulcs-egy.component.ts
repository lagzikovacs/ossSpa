import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {AfakulcsService} from '../afakulcs.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {AfakulcsContainerMode} from '../afakulcscontainermode';
import {AfakulcsEgyMode} from '../afakulcsegymode';
import {rowanimation} from '../../../animation/rowAnimation';
import {deepCopy} from '../../../tools/deepCopy';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';

@Component({
  selector: 'app-afakulcs-egy',
  templateUrl: './afakulcs-egy.component.html',
  animations: [rowanimation]
})
export class AfakulcsEgyComponent implements OnDestroy {
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
    this.afakulcsservice.EgyMode = AfakulcsEgyMode.Reszletek;
  }
  torles () {
    this.afakulcsservice.EgyMode = AfakulcsEgyMode.Torles;
  }
  modositas() {
    this.afakulcsservice.uj = false;
    this.afakulcsservice.DtoEdited = deepCopy(this.afakulcsservice.Dto[this.afakulcsservice.DtoSelectedIndex]);
    this.afakulcsservice.EgyMode = AfakulcsEgyMode.Modositas;
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
    this.afakulcsservice.EgyMode = AfakulcsEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

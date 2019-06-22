import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {TeendoService} from '../teendo.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {TeendoContainerMode} from '../teendocontainermode';
import {TeendoEgyMode} from '../teendoegymode';
import {rowanimation} from '../../../animation/rowAnimation';
import {deepCopy} from '../../../tools/deepCopy';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';

@Component({
  selector: 'app-teendo-egy',
  templateUrl: './teendo-egy.component.html',
  animations: [rowanimation]
})
export class TeendoEgyComponent implements OnDestroy {
  teendoservice: TeendoService;
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
              teendoservice: TeendoService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.teendoservice = teendoservice;
  }

  reszletek() {
    this.teendoservice.EgyMode = TeendoEgyMode.Reszletek;
  }
  torles () {
    this.teendoservice.EgyMode = TeendoEgyMode.Torles;
  }
  modositas() {
    this.teendoservice.uj = false;
    this.teendoservice.DtoEdited = deepCopy(this.teendoservice.Dto[this.teendoservice.DtoSelectedIndex]);
    this.teendoservice.EgyMode = TeendoEgyMode.Modositas;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.teendoservice.Delete(this.teendoservice.Dto[this.teendoservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.teendoservice.Dto.splice(this.teendoservice.DtoSelectedIndex, 1);
        this.teendoservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.torlesutan.emit();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  TorlesCancel() {
    this.teendoservice.EgyMode = TeendoEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

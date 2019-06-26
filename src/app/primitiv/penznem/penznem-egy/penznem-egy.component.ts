import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {PenznemService} from '../penznem.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {rowanimation} from '../../../animation/rowAnimation';
import {deepCopy} from '../../../tools/deepCopy';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {EgyMode} from '../../../enums/egymode';

@Component({
  selector: 'app-penznem-egy',
  templateUrl: './penznem-egy.component.html',
  animations: [rowanimation]
})
export class PenznemEgyComponent implements OnDestroy {
  egymode = EgyMode.Reszletek;
  penznemservice: PenznemService;
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
              penznemservice: PenznemService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.penznemservice = penznemservice;
  }

  reszletek() {
    this.egymode = EgyMode.Reszletek;
  }
  torles () {
    this.egymode = EgyMode.Torles;
  }
  modositas() {
    this.penznemservice.uj = false;
    this.penznemservice.DtoEdited = deepCopy(this.penznemservice.Dto[this.penznemservice.DtoSelectedIndex]);
    this.egymode = EgyMode.Modositas;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.penznemservice.Delete(this.penznemservice.Dto[this.penznemservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.penznemservice.Dto.splice(this.penznemservice.DtoSelectedIndex, 1);
        this.penznemservice.DtoSelectedIndex = -1;

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

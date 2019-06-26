import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {TermekdijService} from '../termekdij.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {rowanimation} from '../../../animation/rowAnimation';
import {deepCopy} from '../../../tools/deepCopy';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {EgyMode} from '../../../enums/egymode';

@Component({
  selector: 'app-termekdij-egy',
  templateUrl: './termekdij-egy.component.html',
  animations: [rowanimation]
})
export class TermekdijEgyComponent implements OnDestroy {
  egymode = EgyMode.Reszletek;
  termekdijservice: TermekdijService;
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
              termekdijservice: TermekdijService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.termekdijservice = termekdijservice;
  }

  reszletek() {
    this.egymode = EgyMode.Reszletek;
  }
  torles () {
    this.egymode = EgyMode.Torles;
  }
  modositas() {
    this.termekdijservice.uj = false;
    this.termekdijservice.DtoEdited = deepCopy(this.termekdijservice.Dto[this.termekdijservice.DtoSelectedIndex]);
    this.egymode = EgyMode.Modositas;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.termekdijservice.Delete(this.termekdijservice.Dto[this.termekdijservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.termekdijservice.Dto.splice(this.termekdijservice.DtoSelectedIndex, 1);
        this.termekdijservice.DtoSelectedIndex = -1;

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

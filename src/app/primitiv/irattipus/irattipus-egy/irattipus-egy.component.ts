import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {IrattipusService} from '../irattipus.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {rowanimation} from '../../../animation/rowAnimation';
import {deepCopy} from '../../../tools/deepCopy';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {EgyMode} from '../../../enums/egymode';

@Component({
  selector: 'app-irattipus-egy',
  templateUrl: './irattipus-egy.component.html',
  animations: [rowanimation]
})
export class IrattipusEgyComponent implements OnDestroy {
  egymode = EgyMode.Reszletek;
  irattipusservice: IrattipusService;
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
              irattipusservice: IrattipusService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.irattipusservice = irattipusservice;
  }

  reszletek() {
    this.egymode = EgyMode.Reszletek;
  }
  torles () {
    this.egymode = EgyMode.Torles;
  }
  modositas() {
    this.irattipusservice.uj = false;
    this.irattipusservice.DtoEdited = deepCopy(this.irattipusservice.Dto[this.irattipusservice.DtoSelectedIndex]);
    this.egymode = EgyMode.Modositas;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.irattipusservice.Delete(this.irattipusservice.Dto[this.irattipusservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.irattipusservice.Dto.splice(this.irattipusservice.DtoSelectedIndex, 1);
        this.irattipusservice.DtoSelectedIndex = -1;

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

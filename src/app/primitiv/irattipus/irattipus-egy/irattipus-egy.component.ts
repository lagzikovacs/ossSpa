import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {IrattipusService} from '../irattipus.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {IrattipusEgyMode} from '../irattipusegymode';
import {IrattipusContainerMode} from '../irattipuscontainermode';
import {rowanimation} from '../../../animation/rowAnimation';
import {deepCopy} from '../../../tools/deepCopy';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';

@Component({
  selector: 'app-irattipus-egy',
  templateUrl: './irattipus-egy.component.html',
  animations: [rowanimation]
})
export class IrattipusEgyComponent implements OnDestroy {
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
    this.irattipusservice.EgyMode = IrattipusEgyMode.Reszletek;
  }
  torles () {
    this.irattipusservice.EgyMode = IrattipusEgyMode.Torles;
  }
  modositas() {
    this.irattipusservice.uj = false;
    this.irattipusservice.DtoEdited = deepCopy(this.irattipusservice.Dto[this.irattipusservice.DtoSelectedIndex]);
    this.irattipusservice.EgyMode = IrattipusEgyMode.Modositas;
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
    this.irattipusservice.EgyMode = IrattipusEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {FizetesimodService} from '../fizetesimod.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {rowanimation} from '../../../animation/rowAnimation';
import {deepCopy} from '../../../tools/deepCopy';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {EgyMode} from '../../../enums/egymode';

@Component({
  selector: 'app-fizetesimod-egy',
  templateUrl: './fizetesimod-egy.component.html',
  animations: [rowanimation]
})
export class FizetesimodEgyComponent implements OnDestroy {
  egymode = EgyMode.Reszletek;
  fizetesimodservice: FizetesimodService;
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
              fizetesimodservice: FizetesimodService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.fizetesimodservice = fizetesimodservice;
  }

  reszletek() {
    this.egymode = EgyMode.Reszletek;
  }
  torles () {
    this.egymode = EgyMode.Torles;
  }
  modositas() {
    this.fizetesimodservice.uj = false;
    this.fizetesimodservice.DtoEdited = deepCopy(this.fizetesimodservice.Dto[this.fizetesimodservice.DtoSelectedIndex]);
    this.egymode = EgyMode.Modositas;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.fizetesimodservice.Delete(this.fizetesimodservice.Dto[this.fizetesimodservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.fizetesimodservice.Dto.splice(this.fizetesimodservice.DtoSelectedIndex, 1);
        this.fizetesimodservice.DtoSelectedIndex = -1;

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

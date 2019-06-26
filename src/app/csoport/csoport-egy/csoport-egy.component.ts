import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {CsoportService} from '../csoport.service';
import {rowanimation} from '../../animation/rowAnimation';
import {deepCopy} from '../../tools/deepCopy';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {EgyMode} from '../../enums/egymode';

@Component({
  selector: 'app-csoport-egy',
  templateUrl: './csoport-egy.component.html',
  animations: [rowanimation]
})
export class CsoportEgyComponent implements OnDestroy {
  egymode = EgyMode.Reszletek;
  csoportservice: CsoportService;
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

  constructor(private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              csoportservice: CsoportService) {
    this.csoportservice = csoportservice;
  }

  reszletek() {
    this.egymode = EgyMode.Reszletek;
  }
  torles () {
    this.egymode = EgyMode.Torles;
  }
  modositas() {
    this.csoportservice.uj = false;
    this.csoportservice.DtoEdited = deepCopy(this.csoportservice.Dto[this.csoportservice.DtoSelectedIndex]);
    this.egymode = EgyMode.Modositas;
  }
  felhasznalo() {
    this.egymode = EgyMode.Felhasznalo;
  }
  jog() {
    this.egymode = EgyMode.Jog;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.csoportservice.Delete(this.csoportservice.Dto[this.csoportservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.csoportservice.Dto.splice(this.csoportservice.DtoSelectedIndex, 1);
        this.csoportservice.DtoSelectedIndex = -1;

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

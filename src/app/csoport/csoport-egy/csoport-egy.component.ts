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

  @Output() eventTorlesutan = new EventEmitter<void>();

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

  doReszletek() {
    this.egymode = EgyMode.Reszletek;
  }
  doTorles () {
    this.egymode = EgyMode.Torles;
  }
  doModositas() {
    this.egymode = EgyMode.Modositas;
  }
  doFelhasznalo() {
    this.egymode = EgyMode.Felhasznalo;
  }
  doJog() {
    this.egymode = EgyMode.Jog;
  }

  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.csoportservice.Delete(this.csoportservice.Dto[this.csoportservice.DtoSelectedIndex])
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.csoportservice.Dto.splice(this.csoportservice.DtoSelectedIndex, 1);
          this.csoportservice.DtoSelectedIndex = -1;

          this.eppFrissit = false;
          this.eventTorlesutan.emit();
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.egymode = EgyMode.Reszletek;
    }
  }

  onModositaskesz() {
    this.egymode = EgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

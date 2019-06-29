import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {ProjektteendoService} from '../projektteendo.service';
import {rowanimation} from '../../animation/rowAnimation';
import {deepCopy} from '../../tools/deepCopy';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {EgyMode} from '../../enums/egymode';

@Component({
  selector: 'app-projekt-teendo-egy',
  templateUrl: './projekt-teendo-egy.component.html',
  animations: [rowanimation]
})
export class ProjektTeendoEgyComponent implements OnDestroy {
  egymode = EgyMode.Reszletek;
  projektteendoservice: ProjektteendoService;

  @Output() eventTorlesutan = new EventEmitter<void>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(projektteendoservice: ProjektteendoService,
              private _spinnerservice: SpinnerService,
              private _errorservice: ErrorService) {
    this.projektteendoservice = projektteendoservice;
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
  doElvegezve() {
    this.egymode = EgyMode.Elvegezve;
  }

  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.projektteendoservice.Delete(this.projektteendoservice.Dto[this.projektteendoservice.DtoSelectedIndex])
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.projektteendoservice.Dto.splice(this.projektteendoservice.DtoSelectedIndex, 1);
          this.projektteendoservice.DtoSelectedIndex = -1;

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

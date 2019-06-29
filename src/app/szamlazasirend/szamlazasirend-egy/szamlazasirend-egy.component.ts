import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {SzamlazasirendService} from '../szamlazasirend.service';
import {rowanimation} from '../../animation/rowAnimation';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {EgyMode} from '../../enums/egymode';

@Component({
  selector: 'app-szamlazasirend-egy',
  templateUrl: './szamlazasirend-egy.component.html',
  animations: [rowanimation]
})
export class SzamlazasirendEgyComponent implements OnDestroy {
  egymode = EgyMode.Reszletek;
  szamlazasirendservice: SzamlazasirendService;

  @Output() eventTorlesutan = new EventEmitter<void>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(szamlazasirendservice: SzamlazasirendService,
              private _spinnerservice: SpinnerService,
              private _errorservice: ErrorService) {
    this.szamlazasirendservice = szamlazasirendservice;
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

  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.szamlazasirendservice.Delete(this.szamlazasirendservice.Dto[this.szamlazasirendservice.DtoSelectedIndex])
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.szamlazasirendservice.Dto.splice(this.szamlazasirendservice.DtoSelectedIndex, 1);
          this.szamlazasirendservice.DtoSelectedIndex = -1;

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

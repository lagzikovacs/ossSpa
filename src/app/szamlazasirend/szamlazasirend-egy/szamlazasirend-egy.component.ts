import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {SzamlazasirendService} from '../szamlazasirend.service';
import {SzamlazasirendEgyMode} from '../szamlazasirendegymode';
import {SzamlazasirendContainerMode} from '../szamlazasirendcontainermode';
import {rowanimation} from '../../animation/rowAnimation';
import {deepCopy} from '../../tools/deepCopy';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-szamlazasirend-egy',
  templateUrl: './szamlazasirend-egy.component.html',
  animations: [rowanimation]
})
export class SzamlazasirendEgyComponent implements OnDestroy {
  szamlazasirendservice: SzamlazasirendService;
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

  constructor(szamlazasirendservice: SzamlazasirendService,
              private _spinnerservice: SpinnerService,
              private _errorservice: ErrorService) {
    this.szamlazasirendservice = szamlazasirendservice;
  }

  reszletek() {
    this.szamlazasirendservice.EgyMode = SzamlazasirendEgyMode.Reszletek;
  }
  torles () {
    this.szamlazasirendservice.EgyMode = SzamlazasirendEgyMode.Torles;
  }
  modositas() {
    this.szamlazasirendservice.uj = false;
    this.szamlazasirendservice.DtoEdited = deepCopy(this.szamlazasirendservice.Dto[this.szamlazasirendservice.DtoSelectedIndex]);
    this.szamlazasirendservice.EgyMode = SzamlazasirendEgyMode.Modositas;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.szamlazasirendservice.Delete(this.szamlazasirendservice.Dto[this.szamlazasirendservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.szamlazasirendservice.Dto.splice(this.szamlazasirendservice.DtoSelectedIndex, 1);
        this.szamlazasirendservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.torlesutan.emit();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  TorlesCancel() {
    this.szamlazasirendservice.EgyMode = SzamlazasirendEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

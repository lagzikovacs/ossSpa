import {Component, OnDestroy} from '@angular/core';
import {SzamlazasirendService} from '../szamlazasirend.service';
import {SzamlazasirendContainerMode} from '../szamlazasirendcontainermode';
import {SzamlazasirendEgyMode} from '../szamlazasirendegymode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-szamlazasirend-list',
  templateUrl: './szamlazasirend-list.component.html'
})
export class SzamlazasirendListComponent implements OnDestroy {
  szamlazasirendservice: SzamlazasirendService;
  ti = -1;

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

  kereses() {
    this.eppFrissit = true;
    this.szamlazasirendservice.Kereses()
      .then(res => {
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  setClickedRow(i: number) {
    this.szamlazasirendservice.DtoSelectedIndex = i;
    this.szamlazasirendservice.uj = false;
    this.szamlazasirendservice.ContainerMode = SzamlazasirendContainerMode.Egy;
    this.szamlazasirendservice.EgyMode = SzamlazasirendEgyMode.Reszletek;
  }
  uj() {
    this.eppFrissit = true;
    this.szamlazasirendservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.szamlazasirendservice.uj = true;
        this.szamlazasirendservice.DtoEdited = res.Result[0];
        this.szamlazasirendservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.szamlazasirendservice.ContainerMode = SzamlazasirendContainerMode.Uj;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

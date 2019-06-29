import {Component, OnDestroy, ViewChild} from '@angular/core';
import {SzamlazasirendService} from '../szamlazasirend.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';

@Component({
  selector: 'app-szamlazasirend-list',
  templateUrl: './szamlazasirend-list.component.html'
})
export class SzamlazasirendListComponent implements OnDestroy {
  @ViewChild('tabla') tabla: TablaComponent;

  szamlazasirendservice: SzamlazasirendService;

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

  onKereses() {
    this.tabla.clearselections();

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

  onId(i: number) {
    this.szamlazasirendservice.DtoSelectedIndex = i;
  }

  onUj() {
    this.tabla.ujtetelstart();
  }

  onUjkesz() {
    this.tabla.ujtetelstop();
  }

  onTorlesutan() {
    this.tabla.clearselections();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

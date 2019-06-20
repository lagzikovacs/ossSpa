import {Component, OnDestroy} from '@angular/core';
import {CsoportService} from '../csoport.service';
import {CsoportFelhasznaloParameter} from '../csoportfelhasznaloparameter';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-csoport-felhasznalo',
  templateUrl: './csoport-felhasznalo.component.html'
})
export class CsoportFelhasznaloComponent implements OnDestroy {
  csoportservice: CsoportService;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(csoportservice: CsoportService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService) {
    this.csoportservice = csoportservice;
  }

  felhasznalo(i: number) {
    this.eppFrissit = true;

    const par = new CsoportFelhasznaloParameter(this.csoportservice.Dto[this.csoportservice.DtoSelectedIndex].Csoportkod,
      this.csoportservice.DtoCsoportFelhasznalo[i].Felhasznalokod, !this.csoportservice.DtoCsoportFelhasznalo[i].Csoporttag);

    this.csoportservice.CsoportFelhasznaloBeKi(par)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.csoportservice.DtoCsoportFelhasznalo[i].Csoporttag = !this.csoportservice.DtoCsoportFelhasznalo[i].Csoporttag;
        this.eppFrissit = false;
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

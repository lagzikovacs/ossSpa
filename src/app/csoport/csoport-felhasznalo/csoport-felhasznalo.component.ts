import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CsoportService} from '../csoport.service';
import {CsoportFelhasznaloParameter} from '../csoportfelhasznaloparameter';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {FelhasznaloDto} from '../../primitiv/felhasznalo/felhasznalodto';

@Component({
  selector: 'app-csoport-felhasznalo',
  templateUrl: './csoport-felhasznalo.component.html'
})
export class CsoportFelhasznaloComponent implements OnInit, OnDestroy {
  @Input() Csoportkod = -1;

  DtoCsoportFelhasznalo = new Array<FelhasznaloDto>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  csoportservice: CsoportService;

  constructor(private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              csoportservice: CsoportService) {
    this.csoportservice = csoportservice;
  }

  ngOnInit() {
    this.eppFrissit = true;
    this.csoportservice.SelectCsoportFelhasznalo(this.Csoportkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.DtoCsoportFelhasznalo = res.Result;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  checkFelhasznalo(i: number) {
    this.eppFrissit = true;

    const par = new CsoportFelhasznaloParameter(this.Csoportkod,
      this.DtoCsoportFelhasznalo[i].Felhasznalokod, !this.DtoCsoportFelhasznalo[i].Csoporttag);

    this.csoportservice.CsoportFelhasznaloBeKi(par)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.DtoCsoportFelhasznalo[i].Csoporttag = !this.DtoCsoportFelhasznalo[i].Csoporttag;
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

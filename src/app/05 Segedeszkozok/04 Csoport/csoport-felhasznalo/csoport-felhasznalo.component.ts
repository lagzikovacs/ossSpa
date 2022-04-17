import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CsoportService} from '../csoport.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {FelhasznaloDto} from '../../03 Felhasznalo/felhasznalodto';
import {CsoportFelhasznaloParam} from '../csoportfelhasznaloparam';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-csoport-felhasznalo',
  templateUrl: './csoport-felhasznalo.component.html'
})
export class CsoportFelhasznaloComponent implements OnInit, OnDestroy {
  @Input() Csoportkod = -1;

  DtoCsoportFelhasznalo = new Array<FelhasznaloDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  csoportservice: CsoportService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              csoportservice: CsoportService) {
    this.csoportservice = csoportservice;
  }

  async ngOnInit() {
    this.spinner = true;
    try {
      const res = await this.csoportservice.SelectCsoportFelhasznalo(this.Csoportkod);
      if (res.Error != null) {
        throw res.Error;
      }

      this.DtoCsoportFelhasznalo = res.Result;
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  async checkFelhasznalo(i: number) {
    const par = new CsoportFelhasznaloParam(this.Csoportkod,
      this.DtoCsoportFelhasznalo[i].Felhasznalokod, !this.DtoCsoportFelhasznalo[i].Csoporttag);

    this.spinner = true;
    try {
      const res = await this.csoportservice.CsoportFelhasznaloBeKi(par);
      if (res.Error != null) {
        throw res.Error;
      }

      this.DtoCsoportFelhasznalo[i].Csoporttag = !this.DtoCsoportFelhasznalo[i].Csoporttag;
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

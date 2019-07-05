import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CsoportService} from '../csoport.service';
import {CsoportJogParameter} from '../csoportjogparameter';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {LehetsegesJogDto} from '../lehetsegesjogdto';

@Component({
  selector: 'app-csoport-jog',
  templateUrl: './csoport-jog.component.html'
})
export class CsoportJogComponent implements OnInit, OnDestroy {
  @Input() Csoportkod = -1;

  DtoCsoportLehetsegesJog = new Array<LehetsegesJogDto>();

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
    this.csoportservice.SelectCsoportJog(this.Csoportkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.DtoCsoportLehetsegesJog = res.Result;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  checkJog(i: number) {
    this.eppFrissit = true;

    const par = new CsoportJogParameter(this.Csoportkod,
      this.DtoCsoportLehetsegesJog[i].Lehetsegesjogkod, !this.DtoCsoportLehetsegesJog[i].Csoporttag);

    this.csoportservice.CsoportJogBeKi(par)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.DtoCsoportLehetsegesJog[i].Csoporttag = !this.DtoCsoportLehetsegesJog[i].Csoporttag;
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

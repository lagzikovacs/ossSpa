import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CsoportService} from '../csoport.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {LehetsegesJogDto} from '../lehetsegesjogdto';
import {CsoportJogParam} from '../csoportjogparam';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-csoport-jog',
  templateUrl: './csoport-jog.component.html'
})
export class CsoportJogComponent implements OnInit, OnDestroy {
  @Input() Csoportkod = -1;

  DtoCsoportLehetsegesJog = new Array<LehetsegesJogDto>();

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
      const res = await this.csoportservice.SelectCsoportJog(this.Csoportkod);
      if (res.Error != null) {
        throw res.Error;
      }

      this.DtoCsoportLehetsegesJog = res.Result;
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  async checkJog(i: number) {
    const par = new CsoportJogParam(this.Csoportkod,
      this.DtoCsoportLehetsegesJog[i].Lehetsegesjogkod, !this.DtoCsoportLehetsegesJog[i].Csoporttag);

    this.spinner = true;
    try {
      const res = await this.csoportservice.CsoportJogBeKi(par);
      if (res.Error != null) {
        throw res.Error;
      }

      this.DtoCsoportLehetsegesJog[i].Csoporttag = !this.DtoCsoportLehetsegesJog[i].Csoporttag;
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

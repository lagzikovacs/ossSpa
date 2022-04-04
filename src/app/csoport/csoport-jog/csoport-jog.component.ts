import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CsoportService} from '../../05 Segedeszkozok/04 Csoport/csoport.service';
import {CsoportJogParam} from '../../05 Segedeszkozok/04 Csoport/csoportjogparam';
import {ErrorService} from '../../common/errorbox/error.service';
import {LehetsegesJogDto} from '../../05 Segedeszkozok/04 Csoport/lehetsegesjogdto';

@Component({
  selector: 'app-csoport-jog',
  templateUrl: './csoport-jog.component.html'
})
export class CsoportJogComponent implements OnInit, OnDestroy {
  @Input() Csoportkod = -1;

  DtoCsoportLehetsegesJog = new Array<LehetsegesJogDto>();

  eppFrissit = false;

  csoportservice: CsoportService;

  constructor(private _errorservice: ErrorService,
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

    const par = new CsoportJogParam(this.Csoportkod,
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

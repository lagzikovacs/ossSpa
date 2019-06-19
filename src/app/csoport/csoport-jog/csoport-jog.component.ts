import {Component, OnDestroy} from '@angular/core';
import {CsoportService} from '../csoport.service';
import {CsoportJogParameter} from '../csoportjogparameter';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-csoport-jog',
  templateUrl: './csoport-jog.component.html'
})
export class CsoportJogComponent implements OnDestroy {

  csoportservice: CsoportService;
  eppFrissit = false;

  constructor(csoportservice: CsoportService,
              private _errorservice: ErrorService) {
    this.csoportservice = csoportservice;
  }

  jog(i: number) {
    this.eppFrissit = true;

    const par = new CsoportJogParameter(this.csoportservice.Dto[this.csoportservice.DtoSelectedIndex].Csoportkod,
      this.csoportservice.DtoCsoportLehetsegesJog[i].Lehetsegesjogkod, !this.csoportservice.DtoCsoportLehetsegesJog[i].Csoporttag);

    this.csoportservice.CsoportJogBeKi(par)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.csoportservice.DtoCsoportLehetsegesJog[i].Csoporttag = !this.csoportservice.DtoCsoportLehetsegesJog[i].Csoporttag;
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

import {Component, OnDestroy} from '@angular/core';
import {EsemenynaploService} from './esemenynaplo.service';
import {ErrorService} from '../tools/errorbox/error.service';
import {SpinnerService} from '../tools/spinner/spinner.service';

@Component({
  selector: 'app-esemenynaplo',
  templateUrl: './esemenynaplo.component.html'
})
export class EsemenynaploComponent implements OnDestroy {
  esemenynaploservice: EsemenynaploService;
  elsokereses = true;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              esemenynaploservice: EsemenynaploService) {
    this.esemenynaploservice = esemenynaploservice;
  }

  onKereses() {
    this.elsokereses = true;
    this.esemenynaploservice.ep.rekordtol = 0;
    this.esemenynaploservice.ep.felhasznalokod = this.esemenynaploservice.Felhasznalokod;

    this.onKeresesTovabb();
  }
  onKeresesTovabb() {
    this.eppFrissit = true;
    this.esemenynaploservice.Select(this.esemenynaploservice.ep)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.elsokereses) {
          this.esemenynaploservice.Dto = res.Result;
          this.elsokereses = false;
        } else {
          const buf = [...this.esemenynaploservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.esemenynaploservice.Dto = buf;
        }
        this.esemenynaploservice.OsszesRekord = res.OsszesRekord;

        this.esemenynaploservice.ep.rekordtol += this.esemenynaploservice.ep.lapmeret;
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

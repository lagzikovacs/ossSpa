import {Component, Input, OnDestroy} from '@angular/core';
import {EsemenynaploService} from './esemenynaplo.service';
import {ErrorService} from '../tools/errorbox/error.service';
import {SpinnerService} from '../tools/spinner/spinner.service';
import {environment} from '../../environments/environment';
import {EsemenynaploParameter} from './esemenynaploparameter';
import {EsemenynaploDto} from './esemenynaplodto';

@Component({
  selector: 'app-esemenynaplo',
  templateUrl: './esemenynaplo.component.html'
})
export class EsemenynaploComponent implements OnDestroy {
  ep = new EsemenynaploParameter(0, environment.lapmeret);
  elsokereses = true;
  OsszesRekord = 0;

  Dto = new Array<EsemenynaploDto>();

  private _felhasznalokod = -1;
  get Felhasznalokod(): number {
    return this._felhasznalokod;
  }
  @Input() set Felhasznalokod(value: number) {
    this._felhasznalokod = value;

    this.Dto = new Array<EsemenynaploDto>();
    this.OsszesRekord = 0;
  }

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  esemenynaploservice: EsemenynaploService;

  constructor(private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              esemenynaploservice: EsemenynaploService) {
    this.esemenynaploservice = esemenynaploservice;
  }

  onKereses() {
    this.elsokereses = true;
    this.ep.rekordtol = 0;
    this.ep.felhasznalokod = this.Felhasznalokod;

    this.onKeresesTovabb();
  }
  onKeresesTovabb() {
    this.eppFrissit = true;
    this.esemenynaploservice.Select(this.ep)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.elsokereses) {
          this.Dto = res.Result;
          this.elsokereses = false;
        } else {
          const buf = [...this.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.Dto = buf;
        }
        this.OsszesRekord = res.OsszesRekord;

        this.ep.rekordtol += this.ep.lapmeret;
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

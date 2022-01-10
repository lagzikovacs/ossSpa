import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EsemenynaploService} from './esemenynaplo.service';
import {ErrorService} from '../tools/errorbox/error.service';
import {environment} from '../../environments/environment';
import {EsemenynaploParameter} from './esemenynaploparameter';
import {EsemenynaploDto} from './esemenynaplodto';

@Component({
  selector: 'app-esemenynaplo',
  templateUrl: './esemenynaplo.component.html'
})
export class EsemenynaploComponent implements OnInit, OnDestroy {
  ep = new EsemenynaploParameter(0, environment.lapmeret);
  elsokereses = true;
  OsszesRekord = 0;
  selectedindex: number;

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

  eppFrissit = false;

  esemenynaploservice: EsemenynaploService;

  constructor(private _errorservice: ErrorService,
              esemenynaploservice: EsemenynaploService) {
    this.esemenynaploservice = esemenynaploservice;
  }

  ngOnInit() {
    this.onKereses();
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

  RowClick(i: number) {
    this.selectedindex = i;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

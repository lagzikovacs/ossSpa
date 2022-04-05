import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EsemenynaploService} from './esemenynaplo.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {environment} from '../../../../environments/environment';
import {EsemenynaploDto} from './esemenynaplodto';
import {EsemenynaploParam} from './esemenynaploparam';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-esemenynaplo',
  templateUrl: './esemenynaplo.component.html'
})
export class EsemenynaploComponent implements OnInit, OnDestroy {
  ep = new EsemenynaploParam(0, environment.lapmeret);
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
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  esemenynaploservice: EsemenynaploService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
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
  async onKeresesTovabb() {
    this.spinner = true;
    try {
      const res = await this.esemenynaploservice.Select(this.ep);
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
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  rowClick(i: number) {
    this.selectedindex = i;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

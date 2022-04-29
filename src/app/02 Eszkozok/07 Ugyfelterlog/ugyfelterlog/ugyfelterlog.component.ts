import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {ErrorService} from "../../../common/errorbox/error.service";
import {Szempont} from "../../../common/enums/szempont";
import {environment} from "../../../../environments/environment";
import {UgyfelterlogParam} from "../ugyfelterlogparam";
import {UgyfelterlogDto} from "../ugyfelterlogdto";
import {UgyfelterlogService} from "../ugyfelterlog.service";
import {SzMT} from "../../../common/dtos/szmt";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ugyfelterlog',
  templateUrl: './ugyfelterlog.component.html'
})
export class UgyfelterlogComponent implements OnDestroy {
  szurok = ['Id', 'Név'];
  szempontok = [
    Szempont.Kod, Szempont.Nev
  ];
  szempont = 0;
  minta = '';
  ulp = new UgyfelterlogParam(0, environment.lapmeret);
  elsokereses = true;
  OsszesRekord = 0;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  Dto = new Array<UgyfelterlogDto>();
  DtoSelectedIndex = -1;

  ugyfelterlogservice: UgyfelterlogService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              ugyfelterlogservice: UgyfelterlogService) {
    this.ugyfelterlogservice = ugyfelterlogservice;
  }

  onKereses() {
    this.Dto = new Array<UgyfelterlogDto>();
    this.DtoSelectedIndex = -1;
    this.OsszesRekord = 0;

    this.elsokereses = true;
    this.ulp.rekordtol = 0;
    this.ulp.fi = new Array<SzMT>();

    this.ulp.fi.push(new SzMT(this.szempontok[this.szempont], this.minta));

    this.onKeresesTovabb();
  }

  async onKeresesTovabb() {
    this.spinner = true;
    try {
      const res = await this.ugyfelterlogservice.Select(this.ulp);
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

      this.ulp.rekordtol += this.ulp.lapmeret;
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

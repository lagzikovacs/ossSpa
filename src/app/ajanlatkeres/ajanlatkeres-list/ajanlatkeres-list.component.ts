import {Component, OnDestroy, ViewChild} from '@angular/core';
import {AjanlatkeresService} from '../ajanlatkeres.service';
import {Szempont} from '../../enums/szempont';
import {SzMT} from '../../dtos/szmt';
import {AjanlatkeresDto} from '../ajanlatkeresdto';
import {ProjektDto} from '../../projekt/projektdto';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';

@Component({
  selector: 'app-ajanlatkeres-list',
  templateUrl: './ajanlatkeres-list.component.html'
})
export class AjanlatkeresListComponent implements OnDestroy {
  @ViewChild('tabla') tabla: TablaComponent;

  szurok = ['Id', 'Ügynök', 'Név', 'Cím', 'Email', 'Telefonszám'];
  szempontok = [
    Szempont.Kod, Szempont.Ugynoknev, Szempont.Nev, Szempont.Cim, Szempont.Email,
    Szempont.Telefonszam
  ];

  ajanlatkeresservice: AjanlatkeresService;

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
              ajanlatkeresservice: AjanlatkeresService) {
    this.ajanlatkeresservice = ajanlatkeresservice;
  }

  onKereses() {
    this.ajanlatkeresservice.Dto = new Array<AjanlatkeresDto>();
    this.ajanlatkeresservice.DtoSelectedIndex = -1;
    this.ajanlatkeresservice.OsszesRekord = 0;

    this.ajanlatkeresservice.elsokereses = true;
    this.ajanlatkeresservice.fp.rekordtol = 0;
    this.ajanlatkeresservice.fp.fi = new Array<SzMT>();

    this.ajanlatkeresservice.fp.fi.push(new SzMT(this.szempontok[this.ajanlatkeresservice.szempont], this.ajanlatkeresservice.minta));

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }
  onKeresesTovabb() {
    this.eppFrissit = true;
    this.ajanlatkeresservice.Select(this.ajanlatkeresservice.fp)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.ajanlatkeresservice.elsokereses) {
          this.ajanlatkeresservice.Dto = res.Result;
          this.ajanlatkeresservice.elsokereses = false;
        } else {
          const buf = [...this.ajanlatkeresservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.ajanlatkeresservice.Dto = buf;
        }
        this.ajanlatkeresservice.OsszesRekord = res.OsszesRekord;

        this.ajanlatkeresservice.fp.rekordtol += this.ajanlatkeresservice.fp.lapmeret;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  setClickedRow(i: number) {
    this.ajanlatkeresservice.ProjektDto = new Array<ProjektDto>();
    this.ajanlatkeresservice.DtoSelectedIndex = i;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

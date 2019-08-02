import {Component, OnDestroy, ViewChild} from '@angular/core';
import {AjanlatkeresService} from '../ajanlatkeres.service';
import {Szempont} from '../../enums/szempont';
import {SzMT} from '../../dtos/szmt';
import {AjanlatkeresDto} from '../ajanlatkeresdto';
import {ErrorService} from '../../tools/errorbox/error.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';
import {environment} from '../../../environments/environment';
import {AjanlatkeresParameter} from '../ajanlatkeresparameter';
import {EgyMode} from '../../enums/egymode';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-ajanlatkeres-list',
  templateUrl: './ajanlatkeres-list.component.html',
  animations: [rowanimation]
})
export class AjanlatkeresListComponent implements OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaComponent;

  szurok = ['Id', 'Ügynök', 'Név', 'Cím', 'Email', 'Telefonszám'];
  szempontok = [
    Szempont.Kod, Szempont.Ugynoknev, Szempont.Nev, Szempont.Cim, Szempont.Email,
    Szempont.Telefonszam
  ];
  szempont = 0;
  minta = '';
  fp = new AjanlatkeresParameter(0, environment.lapmeret);
  OsszesRekord = 0;
  elsokereses = true;
  eppFrissit = false;

  Dto = new Array<AjanlatkeresDto>();
  DtoSelectedIndex = -1;

  egymode = EgyMode.Reszletek;

  ajanlatkeresservice: AjanlatkeresService;

  constructor(private _errorservice: ErrorService,
              ajanlatkeresservice: AjanlatkeresService) {
    this.ajanlatkeresservice = ajanlatkeresservice;
  }

  onKereses() {
    this.Dto = new Array<AjanlatkeresDto>();
    this.DtoSelectedIndex = -1;
    this.OsszesRekord = 0;

    this.elsokereses = true;
    this.fp.rekordtol = 0;
    this.fp.fi = new Array<SzMT>();
    this.fp.fi.push(new SzMT(this.szempontok[this.szempont], this.minta));

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.ajanlatkeresservice.Select(this.fp)
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

        this.fp.rekordtol += this.fp.lapmeret;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onId(i: number) {
    this.DtoSelectedIndex = i;
    this.egymode = EgyMode.Reszletek;
  }

  doNav(i: number) {
    this.egymode = i;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

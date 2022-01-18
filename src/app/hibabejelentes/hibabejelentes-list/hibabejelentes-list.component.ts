import {Component, OnDestroy, ViewChild} from '@angular/core';
import {Szempont} from '../../enums/szempont';
import {SzMT} from '../../dtos/szmt';
import {ErrorService} from '../../tools/errorbox/error.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';
import {environment} from '../../../environments/environment';
import {EgyMode} from '../../enums/egymode';
import {rowanimation} from '../../animation/rowAnimation';
import {HibabejelentesService} from '../hibabejelentes.service';
import {HibabejelentesParameter} from '../hibabejelentesparameter';
import {HibabejelentesDto} from '../hibabejelentesdto';

@Component({
  selector: 'app-hibabejelentes-list',
  templateUrl: './hibabejelentes-list.component.html',
  animations: [rowanimation]
})
export class HibabejelentesListComponent implements OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaComponent;

  szurok = ['Id', 'Név', 'Email', 'Telefonszám', 'Telepítési cím'];
  szempontok = [
    Szempont.Kod, Szempont.Nev, Szempont.Email, Szempont.Telefonszam, Szempont.Cim
  ];
  szempont = 0;
  minta = '';
  fp = new HibabejelentesParameter(0, environment.lapmeret);
  OsszesRekord = 0;
  elsokereses = true;
  eppFrissit = false;

  Dto = new Array<HibabejelentesDto>();
  DtoSelectedIndex = -1;

  bbmode = 1;
  egymode = 1;

  hibabejelentesservice: HibabejelentesService;

  constructor(private _errorservice: ErrorService,
              hibabejelentesservice: HibabejelentesService) {
    this.hibabejelentesservice = hibabejelentesservice;
  }

  onKereses() {
    this.Dto = new Array<HibabejelentesDto>();
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
    this.hibabejelentesservice.Select(this.fp)
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
    if (i !== this.DtoSelectedIndex) {
      this.bbmode = 0;
      this.egymode = 1;
    } else {
      this.bbmode = 1;
      this.egymode = 0;
    }

    this.DtoSelectedIndex = i;
  }

  doNav(i: number) {
    this.bbmode = 0;
    this.egymode = i;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

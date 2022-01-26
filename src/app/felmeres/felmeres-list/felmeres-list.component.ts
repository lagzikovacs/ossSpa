import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Szempont} from '../../enums/szempont';
import {SzMT} from '../../dtos/szmt';
import {ErrorService} from '../../tools/errorbox/error.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';
import {environment} from '../../../environments/environment';
import {EgyMode} from '../../enums/egymode';
import {rowanimation} from '../../animation/rowAnimation';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {propCopy} from '../../tools/propCopy';
import {FelmeresService} from '../felmeres.service';
import {FelmeresParameter} from '../felmeresparameter';
import {FelmeresDto} from '../felmeresdto';
import {deepCopy} from '../../tools/deepCopy';

@Component({
  selector: 'app-felmeres-list',
  templateUrl: './felmeres-list.component.html',
  animations: [rowanimation]
})
export class FelmeresListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaComponent;

  @Input() ProjektBol = false;
  @Input() ProjektDto;

  statuszszurok = ['Mind', 'Csak a nyitottak'];
  statusz = 1;

  szurok = ['Id', 'Ügynök', 'Név', 'Cím', 'Email', 'Telefonszám'];
  szempontok = [
    Szempont.Kod, Szempont.Ugynoknev, Szempont.Nev, Szempont.Cim, Szempont.Email,
    Szempont.Telefonszam
  ];
  szempont = 0;
  minta = '';

  fp = new FelmeresParameter(0, environment.lapmeret);
  OsszesRekord = 0;
  elsokereses = true;
  jog = false;
  eppFrissit = false;

  Dto = new Array<FelmeresDto>();
  DtoSelectedIndex = -1;

  egymode = 1;

  felmeresservice: FelmeresService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              felmeresservice: FelmeresService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.FELMERESMOD]);

    this.felmeresservice = felmeresservice;
  }

  ngOnInit(): void {
    if (this.ProjektBol) {
      this.onKereses();
    }
  }

  onKereses() {
    this.Dto = new Array<FelmeresDto>();
    this.DtoSelectedIndex = -1;
    this.OsszesRekord = 0;

    this.elsokereses = true;
    this.fp.rekordtol = 0;
    this.fp.fi = new Array<SzMT>();
    this.fp.fi.push(new SzMT(this.szempontok[this.szempont], this.minta));
    if (this.ProjektBol) {
      this.fp.fi.push(new SzMT(Szempont.Projekt, this.ProjektDto.Projektkod));
    }
    if (this.statusz === 1) {
      this.fp.fi.push(new SzMT(Szempont.CsakNyitottak, true));
    }

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.felmeresservice.Select(this.fp)
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
      this.egymode = 1;
    } else {
      this.egymode = 0;
    }

    this.DtoSelectedIndex = i;
  }

  doNav(i: number) {
    this.egymode = i;
  }

  doUjtetel() {
    this.tabla.ujtetelstart();
  }
  onUjtetelkesz(dto: FelmeresDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }
  onModositaskesz(dto: FelmeresDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto[this.DtoSelectedIndex]);
    }
    this.egymode = 0;
  }
  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.felmeresservice.Delete(this.Dto[this.DtoSelectedIndex])
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.Dto.splice(this.DtoSelectedIndex, 1);
          this.DtoSelectedIndex = -1;

          this.eppFrissit = false;
          this.tabla.clearselections();
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.egymode = 0;
    }
  }

  onProjekthezRendeles(projektkod: number) {
    if (projektkod !== null) {
      this.eppFrissit = true;

      const DtoEdited = deepCopy(this.Dto[this.DtoSelectedIndex]);

      DtoEdited.Projektkod = projektkod;

      this.felmeresservice.Update(DtoEdited)
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          return this.felmeresservice.Get(DtoEdited.Hibabejelenteskod);
        })
        .then(res1 => {
          if (res1.Error != null) {
            throw res1.Error;
          }

          propCopy(res1.Result[0], this.Dto[this.DtoSelectedIndex]);
          this.egymode = 0;
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.egymode = 0;
    }
  }

  zarasnyitas() {
    this.eppFrissit = true;
    this.egymode = 0;

    const DtoEdited = deepCopy(this.Dto[this.DtoSelectedIndex]);

    this.felmeresservice.ZarasNyitas(DtoEdited)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.felmeresservice.Get(DtoEdited.Hibabejelenteskod);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        propCopy(res1.Result[0], this.Dto[this.DtoSelectedIndex]);
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

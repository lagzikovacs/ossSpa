import {Component, OnDestroy, ViewChild} from '@angular/core';
import {AjanlatkeresService} from '../ajanlatkeres.service';
import {Szempont} from '../../common/enums/szempont';
import {SzMT} from '../../common/dtos/szmt';
import {AjanlatkeresDto} from '../ajanlatkeresdto';
import {ErrorService} from '../../common/errorbox/error.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';
import {environment} from '../../../environments/environment';
import {AjanlatkeresParameter} from '../ajanlatkeresparameter';
import {EgyMode} from '../../common/enums/egymode';
import {rowanimation} from '../../animation/rowAnimation';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {JogKod} from '../../common/enums/jogkod';
import {propCopy} from '../../common/propCopy';
import {deepCopy} from '../../common/deepCopy';

@Component({
  selector: 'app-ajanlatkeres-list',
  templateUrl: './ajanlatkeres-list.component.html',
  animations: [rowanimation]
})
export class AjanlatkeresListComponent implements OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaComponent;

  statuszszurok = ['Mind', 'Csak a nyitottak'];
  statusz = 1;

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
  jog = false;
  eppFrissit = false;

  Dto = new Array<AjanlatkeresDto>();
  DtoSelectedIndex = -1;

  egymode = 0;

  cim = '';
  kerdes = '';
  uzenet = '';

  ajanlatkeresservice: AjanlatkeresService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              ajanlatkeresservice: AjanlatkeresService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.AJANLATKERESMOD]);

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
    if (this.statusz === 1) {
      this.fp.fi.push(new SzMT(Szempont.CsakNyitottak, true));
    }

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
    this.egymode = 0;

    this.DtoSelectedIndex = i;
  }

  doNav(i: number) {
    this.egymode = i;
  }

  doUjtetel() {
    this.tabla.ujtetelstart();
  }
  onUjtetelkesz(dto: AjanlatkeresDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }
  onModositaskesz(dto: AjanlatkeresDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto[this.DtoSelectedIndex]);
    }
    this.egymode = 0;
  }
  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.ajanlatkeresservice.Delete(this.Dto[this.DtoSelectedIndex])
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

  zarasnyitas() {
    this.cim = this.Dto[this.DtoSelectedIndex].Nyitott ? 'Ajánlatkérés zárása' : 'Ajánlatkérés újranyitása';
    this.kerdes = this.Dto[this.DtoSelectedIndex].Nyitott ? 'Biztosan zárja ezt az ajánlatkérést?' : 'Biztosan újranyitja ezt az ajánlatkérést?';
    this.uzenet = 'Kis türelmet...';

    this.egymode = 45;
  }

  zarasnyitasOk() {
    this.eppFrissit = true;
    const DtoEdited = deepCopy(this.Dto[this.DtoSelectedIndex]);

    this.ajanlatkeresservice.ZarasNyitas(DtoEdited)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.ajanlatkeresservice.Get(DtoEdited.Ajanlatkereskod);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        propCopy(res1.Result[0], this.Dto[this.DtoSelectedIndex]);

        if (this.Dto[this.DtoSelectedIndex].Nyitott) {
          this.uzenet = 'Az ajánlatkérés újra megnyitva!';
        } else {
          this.uzenet = 'Az ajánlatkérés lezárva!';
        }

        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  zarasnyitasCancel() {
    this.egymode = 0;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Szempont} from '../../common/enums/szempont';
import {SzMT} from '../../common/dtos/szmt';
import {ErrorService} from '../../common/errorbox/error.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';
import {environment} from '../../../environments/environment';
import {EgyMode} from '../../common/enums/egymode';
import {rowanimation} from '../../animation/rowAnimation';
import {HibabejelentesService} from '../hibabejelentes.service';
import {HibabejelentesParameter} from '../hibabejelentesparameter';
import {HibabejelentesDto} from '../hibabejelentesdto';
import {propCopy} from '../../common/propCopy';
import {JogKod} from '../../common/enums/jogkod';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {deepCopy} from '../../common/deepCopy';

@Component({
  selector: 'app-hibabejelentes-list',
  templateUrl: './hibabejelentes-list.component.html',
  animations: [rowanimation]
})
export class HibabejelentesListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaComponent;

  @Input() ProjektBol = false;
  @Input() ProjektDto;

  statuszszurok = ['Mind', 'Csak a nyitottak'];
  statusz = 1;

  szurok = ['Id', 'Név', 'Email', 'Telefonszám', 'Telepítési cím'];
  szempontok = [
    Szempont.Kod, Szempont.Nev, Szempont.Email, Szempont.Telefonszam, Szempont.Cim
  ];
  szempont = 0;
  minta = '';

  fp = new HibabejelentesParameter(0, environment.lapmeret);
  OsszesRekord = 0;
  elsokereses = true;
  jog = false;
  eppFrissit = false;

  Dto = new Array<HibabejelentesDto>();
  DtoSelectedIndex = -1;

  egymode = 1;

  cim = '';
  kerdes = '';
  uzenet = '';
  dokcim = 'A jelentés dokumentumai';
  dokcim1 = 'A telepítés dokumentumai';

  hibabejelentesservice: HibabejelentesService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              hibabejelentesservice: HibabejelentesService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.HIBABEJELENTESMOD]);

    this.hibabejelentesservice = hibabejelentesservice;
  }

  ngOnInit(): void {
    if (this.ProjektBol) {
      this.onKereses();
    }
  }

  onKereses() {
    this.Dto = new Array<HibabejelentesDto>();
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
  onUjtetelkesz(dto: HibabejelentesDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }
  onModositaskesz(dto: HibabejelentesDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto[this.DtoSelectedIndex]);
    }
    this.egymode = 0;
  }
  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.hibabejelentesservice.Delete(this.Dto[this.DtoSelectedIndex])
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

      this.hibabejelentesservice.Update(DtoEdited)
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          return this.hibabejelentesservice.Get(DtoEdited.Hibabejelenteskod);
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
    this.cim = this.Dto[this.DtoSelectedIndex].Nyitott ? 'Hibabejelentés zárása' : 'Hibabejelentés újranyitása';
    this.kerdes = this.Dto[this.DtoSelectedIndex].Nyitott ? 'Biztosan zárja ezt a hibabejelentést?' : 'Biztosan újranyitja ezt a hibabejelentést?';
    this.uzenet = 'Kis türelmet...';

    this.egymode = 45;
  }

  zarasnyitasOk() {
    this.eppFrissit = true;
    const DtoEdited = deepCopy(this.Dto[this.DtoSelectedIndex]);

    this.hibabejelentesservice.ZarasNyitas(DtoEdited)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.hibabejelentesservice.Get(DtoEdited.Hibabejelenteskod);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        propCopy(res1.Result[0], this.Dto[this.DtoSelectedIndex]);

        if (this.Dto[this.DtoSelectedIndex].Nyitott) {
          this.uzenet = 'A hibabejelentés újra megnyitva!';
        } else {
          this.uzenet = 'A hibabejelentés lezárva!';
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

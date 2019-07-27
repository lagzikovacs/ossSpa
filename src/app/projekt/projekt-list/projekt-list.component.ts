import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {SzMT} from '../../dtos/szmt';
import {Szempont} from '../../enums/szempont';
import {JogKod} from '../../enums/jogkod';
import {LogonService} from '../../logon/logon.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {ProjektTablaComponent} from '../projekttabla/projekt-tabla.component';
import {environment} from '../../../environments/environment';
import {ProjektParameter} from '../projektparameter';
import {EgyMode} from '../../enums/egymode';
import {ProjektDto} from '../projektdto';
import {propCopy} from '../../tools/propCopy';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-projekt-list',
  templateUrl: './projekt-list.component.html',
  animations: [rowanimation]
})
export class ProjektListComponent implements OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: ProjektTablaComponent;

  statuszszurok = [
    '(0) Mind', '(1) Ajánlat', '(2) Fut', '(3) Kész', '(4) Pályázatra vár', '(5) Mástól megrendelte',
    '(6) Döglött', '(7) Csak érdeklődött', '(8) Helyszíni felmérést kér', '(9) Kommunikál, van remény',
    '(10) Még papírozni kell', '(11) Elhalasztva', '(12) Passzív', '(13) Felmérés után', '(14) Roadshow-ra jelentkezett',
    '(15) Link'
  ];
  teendoszurok = ['Mind', 'Teendő', 'Saját teendő', 'Lejárt teendő'];
  szurok = ['Id', 'Ügyfél', 'Ügyfélcím', 'Email', 'Telefon', 'Telepítési cím', 'Keletkezett', 'Műszaki állapot'];

  teendoSzempontok = [
    Szempont.Null, Szempont.CsakHaTeendo,
    Szempont.SajatTeendo, Szempont.CsakHaLejartTeendo
  ];
  szempontok = [
    Szempont.Kod, Szempont.Ugyfel,
    Szempont.UgyfelCim, Szempont.UgyfelEmail, Szempont.UgyfelTelefonszam,
    Szempont.TelepitesiCim, Szempont.Keletkezett, Szempont.MuszakiAllapot
  ];

  mod = false;
  export = false;
  projektcsoport = '';

  statuszszempont = 0;
  teendoszempont = 0;
  szempont = 0;
  minta = '';
  pp = new ProjektParameter(0, environment.lapmeret);
  elsokereses = true;
  OsszesRekord = 0;

  Dto = new Array<ProjektDto>();
  DtoSelectedIndex = -1;

  egymode = EgyMode.Bizonylatesirat;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  projektservice: ProjektService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              projektservice: ProjektService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PROJEKTMOD]);
    this.projektservice = projektservice;
  }

  onKereses() {
    this.export = false;

    this.elsokereses = true;
    this.pp.rekordtol = 0;
    this.pp.statusz = this.statuszszempont;
    this.pp.fi = new Array();
    if (this.teendoszempont !== 0) {
      this.pp.fi.push(new SzMT(this.teendoSzempontok[this.teendoszempont], ''));
    }
    this.pp.fi.push(new SzMT(this.szempontok[this.szempont], this.minta));

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }
  onKeresesTovabb() {
    this.eppFrissit = true;
    this.projektservice.Select(this.pp)
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

        this.pp.rekordtol += this.pp.lapmeret;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onId(i: number) {
    this.DtoSelectedIndex = i;
    this.egymode = EgyMode.Bizonylatesirat;
  }

  doNav(i: number) {
    this.egymode = i;
  }

  doUjtetel() {
    this.tabla.ujtetelstart();
  }
  onUjtetelkesz(dto: ProjektDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }
  onModositaskesz(dto: ProjektDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto[this.DtoSelectedIndex]);
    }
    this.egymode = EgyMode.Reszletek;
  }
  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.projektservice.Delete(this.Dto[this.DtoSelectedIndex])
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
      this.egymode = EgyMode.Reszletek;
    }
  }

  onMunkalaputan() {
    // TODO a munkalap írja a projektet, újra kell olvasni
  }

  onSegedOk(dto: ProjektDto) {
    this.eppFrissit = true;
    this.projektservice.Update(dto)
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        return this.projektservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        propCopy(res1.Result[0], this.Dto[this.DtoSelectedIndex]);

        this.eppFrissit = false;
        this.egymode = EgyMode.Reszletek;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  onSegedCancel() {
    this.egymode = EgyMode.Reszletek;
  }

  onExport(sszi: number) {
    this.projektcsoport = this.statuszszurok[sszi];
    this.export = true;
  }
  doExportbezar() {
    this.export = false;
  }

  torlesutan() {
    this.tabla.clearselections();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

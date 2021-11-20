import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {SzMT} from '../../dtos/szmt';
import {Szempont} from '../../enums/szempont';
import {JogKod} from '../../enums/jogkod';
import {LogonService} from '../../logon/logon.service';
import {ErrorService} from '../../tools/errorbox/error.service';
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

  jegyzetszurok = ['Mind', 'Jegyzet is'];
  szurok = ['Id', 'Ügyfél', 'Ügyfélcím', 'Email', 'Telefon', 'Telepítési cím', 'Keletkezett', 'Műszaki állapot'];

  jegyzetSzempontok = [
    Szempont.Null, Szempont.CsakHaJegyzetIs
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
  jegyzetszempont = 0;
  szempont = 0;
  minta = '';
  pp = new ProjektParameter(0, environment.lapmeret);
  elsokereses = true;
  OsszesRekord = 0;
  eppFrissit = false;

  Dto = new Array<ProjektDto>();
  DtoSelectedIndex = -1;

  bbmode = 1;
  egymode = 24;

  projektservice: ProjektService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
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
    if (this.jegyzetszempont !== 0) {
      this.pp.fi.push(new SzMT(this.jegyzetSzempontok[this.jegyzetszempont], ''));
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
    if (i !== this.DtoSelectedIndex) {
      this.bbmode = 0;
      this.egymode = 24;
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
    this.bbmode = 1;
    this.egymode = 0;
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
      this.bbmode = 1;
      this.egymode = 0;
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
        this.bbmode = 1;
        this.egymode = 0;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  onSegedCancel() {
    this.bbmode = 1;
    this.egymode = 0;
  }

  onExport(sszi: number) {
    this.projektcsoport = this.projektservice.statuszszurok[sszi];
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

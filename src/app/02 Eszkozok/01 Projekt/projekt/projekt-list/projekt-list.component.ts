import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {SzMT} from '../../../../common/dtos/szmt';
import {Szempont} from '../../../../common/enums/szempont';
import {JogKod} from '../../../../common/enums/jogkod';
import {LogonService} from '../../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {ProjektTablaComponent} from '../projekttabla/projekt-tabla.component';
import {environment} from '../../../../../environments/environment';
import {ProjektParam} from '../projektparam';
import {ProjektDto} from '../projektdto';
import {propCopy} from '../../../../common/propCopy';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projekt-list',
  templateUrl: './projekt-list.component.html'
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

  jog = false;
  uj = false;
  export = false;
  projektcsoport = '';

  statuszszempont = 0;
  jegyzetszempont = 0;
  szempont = 0;
  minta = '';
  pp = new ProjektParam(0, environment.lapmeret);
  elsokereses = true;
  OsszesRekord = 0;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  Dto = new Array<ProjektDto>();
  DtoSelectedIndex = -1;

  projektservice: ProjektService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              projektservice: ProjektService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.PROJEKTMOD]);

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

  async onKeresesTovabb() {
    this.spinner = true;
    try {
      const res = await this.projektservice.Select(this.pp);
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
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  onExport(sszi: number) {
    this.projektcsoport = this.projektservice.statuszszurok[sszi];
    this.export = true;
  }

  doExportbezar() {
    this.export = false;
  }

  onId(i: number) {
    this.DtoSelectedIndex = i;

    this.uj = false;
    this.tabla.egytetelstart();
  }

  doUjtetel() {
    this.uj = true;
    this.tabla.ujtetelstart();
  }

  onUjtetelkesz(dto: ProjektDto) {
    if (dto !== undefined) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }

  onTorlesutan() {
    this.Dto.splice(this.DtoSelectedIndex, 1);
    this.DtoSelectedIndex = -1;
    this.tabla.clearselections();
  }

  onSzerkesztesutan(dto: ProjektDto) {
    propCopy(dto, this.Dto[this.DtoSelectedIndex]);
  }






  // onMunkalaputan() {
  //   // TODO a munkalap írja a projektet, újra kell olvasni
  // }
  //
  // onSegedOk(dto: ProjektDto) {
  //   this.eppFrissit = true;
  //   this.projektservice.Update(dto)
  //     .then(res => {
  //       if (res.Error !== null) {
  //         throw res.Error;
  //       }
  //
  //       return this.projektservice.Get(res.Result);
  //     })
  //     .then(res1 => {
  //       if (res1.Error !== null) {
  //         throw res1.Error;
  //       }
  //
  //       propCopy(res1.Result[0], this.Dto[this.DtoSelectedIndex]);
  //
  //       this.eppFrissit = false;
  //       this.egymode = 0;
  //     })
  //     .catch(err => {
  //       this.eppFrissit = false;
  //       this._errorservice.Error = err;
  //     });
  // }
  // onSegedCancel() {
  //   this.egymode = 0;
  // }



  torlesutan() {
    this.tabla.clearselections();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

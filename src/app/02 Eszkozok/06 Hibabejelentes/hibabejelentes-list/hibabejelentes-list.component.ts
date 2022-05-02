import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Szempont} from '../../../common/enums/szempont';
import {SzMT} from '../../../common/dtos/szmt';
import {ErrorService} from '../../../common/errorbox/error.service';
import {environment} from '../../../../environments/environment';
import {rowanimation} from '../../../animation/rowAnimation';
import {HibabejelentesService} from '../hibabejelentes.service';
import {HibabejelentesParam} from '../hibabejelentesparam';
import {HibabejelentesDto} from '../hibabejelentesdto';
import {propCopy} from '../../../common/propCopy';
import {JogKod} from '../../../common/enums/jogkod';
import {LogonService} from '../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {TablaExComponent} from '../../../common/tabla-ex/tabla-ex.component';

@Component({
  selector: 'app-hibabejelentes-list',
  templateUrl: './hibabejelentes-list.component.html',
  animations: [rowanimation]
})
export class HibabejelentesListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaExComponent;

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

  fp = new HibabejelentesParam(0, environment.lapmeret);
  OsszesRekord = 0;
  elsokereses = true;
  jog = false;
  uj = false;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

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
              private _cdr: ChangeDetectorRef,
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

  async onKeresesTovabb() {
    this.spinner = true;
    try {
      const res = await this.hibabejelentesservice.Select(this.fp);
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
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
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

  onUjtetelkesz(dto: HibabejelentesDto) {
    if (dto !== undefined) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }

  onTorles(ok: boolean) {
    this.Dto.splice(this.DtoSelectedIndex, 1);
    this.DtoSelectedIndex = -1;
    this.tabla.clearselections();
  }

  onModositaskesz(dto: HibabejelentesDto) {
    propCopy(dto, this.Dto[this.DtoSelectedIndex]);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
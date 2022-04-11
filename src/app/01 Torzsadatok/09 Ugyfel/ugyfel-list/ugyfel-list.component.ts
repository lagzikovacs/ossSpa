import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild
} from '@angular/core';
import {Szempont} from '../../../common/enums/szempont';
import {UgyfelService} from '../ugyfel.service';
import {UgyfelDto} from '../ugyfeldto';
import {SzMT} from '../../../common/dtos/szmt';
import {LogonService} from '../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {JogKod} from '../../../common/enums/jogkod';
import {ErrorService} from '../../../common/errorbox/error.service';
import {UgyfelTablaComponent} from '../ugyfel-tabla/ugyfel-tabla.component';
import {environment} from '../../../../environments/environment';
import {UgyfelParam} from '../ugyfelparam';
import {deepCopy} from '../../../common/deepCopy';
import {propCopy} from '../../../common/propCopy';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ugyfel-list',
  templateUrl: './ugyfel-list.component.html'
  })
  export class UgyfelListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: UgyfelTablaComponent;

  csoportszempont = 0;
  csoportszurok = ['Mind', 'Kiemelt'];
  szurok = ['Név', 'Cég', 'Beosztás', 'Helységnév', 'Telefon', 'Email', 'Egyéb link', 'Ajánlotta', 'Id'];
  szempont = 0;
  minta = '';
  up = new UgyfelParam(0, environment.lapmeret);
  szempontok = [
    Szempont.Nev, Szempont.Ceg, Szempont.Beosztas, Szempont.Telepules, Szempont.UgyfelTelefonszam, Szempont.UgyfelEmail,
    Szempont.Egyeblink, Szempont.Ajanlo, Szempont.Kod
  ];
  elsokereses = true;
  osszesrekord = 0;
  jog = false;
  uj = false;
  zoom = false;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  Dto = new Array<UgyfelDto>();
  DtoSelectedIndex = -1;

  @Input() set maszk(value: string) {
    if (value !== undefined) {
      this.csoportszempont = 0;
      this.minta = value || '';
      this.szempont = 0;
      this.zoom = true;
    }
  }
  @Output() eventSelectzoom = new EventEmitter<UgyfelDto>();
  @Output() eventStopzoom = new EventEmitter<void>();

  ugyfelservice: UgyfelService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              ugyfelservice: UgyfelService  ) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.UGYFELEKMOD]);

    this.ugyfelservice = ugyfelservice;
  }

  ngOnInit() {
    if (this.zoom) {
      this.onKereses();
    }
  }

  onKereses() {
    this.Dto = new Array<UgyfelDto>();
    this.DtoSelectedIndex = -1;
    this.osszesrekord = 0;

    this.elsokereses = true;
    this.up.rekordtol = 0;
    this.up.csoport = this.csoportszempont;
    this.up.fi = new Array<SzMT>();
    this.up.fi.push(new SzMT(this.szempontok[this.szempont], this.minta));

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  async onKeresesTovabb() {
    this.spinner = true;
    try {
      const res = await this.ugyfelservice.Select(this.up);
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
      this.osszesrekord = res.OsszesRekord;

      this.up.rekordtol += this.up.lapmeret;
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

  onUjtetelkesz(dto: UgyfelDto) {
    if (dto !== undefined) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }

  onTorles() {
    this.Dto.splice(this.DtoSelectedIndex, 1);
    this.DtoSelectedIndex = -1;
    this.tabla.clearselections();
  }

  onModositaskesz(dto: UgyfelDto) {
    propCopy(dto, this.Dto[this.DtoSelectedIndex]);
  }

  onStartzoom(i: number) {
    this.eventSelectzoom.emit(deepCopy(this.Dto[i]));

    this.onStopzoom();
  }
  onStopzoom() {
    this.zoom = false;

    this.eventStopzoom.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

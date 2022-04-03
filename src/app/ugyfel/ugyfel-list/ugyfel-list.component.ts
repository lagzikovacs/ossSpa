import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Szempont} from '../../common/enums/szempont';
import {UgyfelService} from '../../01 Torzsadatok/09 Ugyfel/ugyfel.service';
import {UgyfelDto} from '../../01 Torzsadatok/09 Ugyfel/ugyfeldto';
import {SzMT} from '../../common/dtos/szmt';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {JogKod} from '../../common/enums/jogkod';
import {ErrorService} from '../../tools/errorbox/error.service';
import {UgyfelTablaComponent} from '../ugyfel-tabla/ugyfel-tabla.component';
import {environment} from '../../../environments/environment';
import {UgyfelParam} from '../../01 Torzsadatok/09 Ugyfel/ugyfelparam';
import {deepCopy} from '../../common/deepCopy';
import {EgyMode} from '../../common/enums/egymode';
import {rowanimation} from '../../animation/rowAnimation';
import {propCopy} from '../../common/propCopy';

@Component({
  selector: 'app-ugyfel-list',
  templateUrl: './ugyfel-list.component.html',
  animations: [rowanimation]
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
  zoom = false;
  eppFrissit = false;

  Dto = new Array<UgyfelDto>();
  DtoSelectedIndex = -1;

  egymode = EgyMode.Reszletek;

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

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.ugyfelservice.Select(this.up)
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
        this.osszesrekord = res.OsszesRekord;

        this.up.rekordtol += this.up.lapmeret;
        this.eppFrissit = false;

        // if (this.ugyfelservice.zoom) {
        //   window.scrollTo(0, document.body.scrollHeight);
        // }
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onId(i: number) {
    this.DtoSelectedIndex = i;
    this.egymode = 0;
  }

  doNav(i: number) {
    this.egymode = i;
  }



  doUjtetel() {
    this.tabla.ujtetelstart();
  }
  onUjtetelkesz(dto: UgyfelDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }
  onModositaskesz(dto: UgyfelDto) {
    this.onModositaskeszCsak(dto);
    this.egymode = 0;
  }
  onModositaskeszCsak(dto: UgyfelDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto[this.DtoSelectedIndex]);
    }
  }
  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.ugyfelservice.Delete(this.Dto[this.DtoSelectedIndex])
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

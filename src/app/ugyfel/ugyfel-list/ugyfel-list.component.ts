import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Szempont} from '../../enums/szempont';
import {UgyfelService} from '../ugyfel.service';
import {UgyfelDto} from '../ugyfeldto';
import {SzMT} from '../../dtos/szmt';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {ZoomSources} from '../../enums/zoomsources';
import {IratService} from '../../irat/irat.service';
import {ProjektService} from '../../projekt/projekt.service';
import {ProjektSzerkesztesMode} from '../../projekt/projektszerkesztesmode';
import {IratSzerkesztesMode} from '../../irat/iratszerkesztesmode';
import {BizonylatService} from '../../bizonylat/bizonylat.service';
import {BizonylatSzerkesztesMode} from '../../bizonylat/bizonylatszerkesztesmode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {UgyfelTablaComponent} from '../ugyfel-tabla/ugyfel-tabla.component';
import {environment} from '../../../environments/environment';
import {UgyfelParameter} from '../ugyfelparameter';
import {deepCopy} from '../../tools/deepCopy';

@Component({
  selector: 'app-ugyfel-list',
  templateUrl: './ugyfel-list.component.html'
})
export class UgyfelListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla') tabla: UgyfelTablaComponent;

  csoportszempont = 0;
  csoportszurok = ['Mind', 'Kiemelt'];
  szurok = ['Név', 'Cég', 'Beosztás', 'Helységnév', 'Telefon', 'Email', 'Egyéb link', 'Ajánlotta', 'Id'];
  szempont = 0;
  minta = '';
  up = new UgyfelParameter(0, environment.lapmeret);
  szempontok = [
    Szempont.Nev, Szempont.Ceg, Szempont.Beosztas, Szempont.Telepules, Szempont.UgyfelTelefonszam, Szempont.UgyfelEmail,
    Szempont.Egyeblink, Szempont.Ajanlo, Szempont.Kod
  ];
  elsokereses = true;
  osszesrekord = 0;
  jog = false;
  zoom = false;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  // private _elsokereses = true;
  // @Output() elsokeresesChange = new EventEmitter<boolean>();
  // @Input() get elsokereses() { return this._elsokereses; }
  // set elsokereses(value: boolean) {
  //   this._elsokereses = value;
  //   this.elsokeresesChange.emit(this._elsokereses);
  // }
  //
  // private _osszesrekord = 0;
  // @Output() osszesrekordChange = new EventEmitter<number>();
  // @Input() get osszesrekord() { return this._osszesrekord; }
  // set osszesrekord(value: number) {
  //   this._osszesrekord = value;
  //   this.osszesrekordChange.emit(this._osszesrekord);
  // }

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
              private _iratservice: IratService,
              private _projektservice: ProjektService,
              private _bizonylatservice: BizonylatService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
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
    this.ugyfelservice.Dto = new Array<UgyfelDto>();
    this.ugyfelservice.DtoSelectedIndex = -1;
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
          this.ugyfelservice.Dto = res.Result;
          this.elsokereses = false;
        } else {
          const buf = [...this.ugyfelservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.ugyfelservice.Dto = buf;
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

  onStartzoom(i: number) {
    this.eventSelectzoom.emit(deepCopy(this.ugyfelservice.Dto[i]));

    this.onStopzoom();
  }
  onStopzoom() {
    this.zoom = false;

    this.eventStopzoom.emit();
  }

  onId(i: number) {
    this.ugyfelservice.DtoSelectedIndex = i;
  }

  onUj() {
    this.tabla.ujtetelstart();
  }

  onUjkesz() {
    this.tabla.ujtetelstop();
  }

  onTorlesutan() {
    this.tabla.clearselections();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

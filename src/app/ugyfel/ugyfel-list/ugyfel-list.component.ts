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
    if (this.ugyfelservice.zoomsource === ZoomSources.Irat) {
      this._iratservice.DtoEdited.Ugyfelkod = this.ugyfelservice.Dto[i].Ugyfelkod;
      this._iratservice.DtoEdited.Ugyfelnev = this.ugyfelservice.Dto[i].Nev;
      this._iratservice.DtoEdited.Ugyfelcim = this.ugyfelservice.Dto[i].Cim;
    }
    if (this.ugyfelservice.zoomsource === ZoomSources.Projekt) {
      this._projektservice.DtoEdited.Ugyfelkod = this.ugyfelservice.Dto[i].Ugyfelkod;
      this._projektservice.DtoEdited.Ugyfelnev = this.ugyfelservice.Dto[i].Nev;
      this._projektservice.DtoEdited.Ugyfelcim = this.ugyfelservice.Dto[i].Cim;
    }
    if (this.ugyfelservice.zoomsource === ZoomSources.Bizonylat) {
      this._bizonylatservice.ComplexDtoEdited.Dto.Ugyfelkod = this.ugyfelservice.Dto[i].Ugyfelkod;
      this._bizonylatservice.ComplexDtoEdited.Dto.Ugyfelnev = this.ugyfelservice.Dto[i].Nev;
      this._bizonylatservice.ComplexDtoEdited.Dto.Ugyfelcim = this.ugyfelservice.Dto[i].Cim;

      this._bizonylatservice.ComplexDtoEdited.Dto.Ugyfeladoszam = this.ugyfelservice.Dto[i].Adoszam;

      this._bizonylatservice.ComplexDtoEdited.Dto.Ugyfeliranyitoszam = this.ugyfelservice.Dto[i].Iranyitoszam;
      this._bizonylatservice.ComplexDtoEdited.Dto.Ugyfelhelysegkod = this.ugyfelservice.Dto[i].Helysegkod;
      this._bizonylatservice.ComplexDtoEdited.Dto.Ugyfelhelysegnev = this.ugyfelservice.Dto[i].Helysegnev;
      this._bizonylatservice.ComplexDtoEdited.Dto.Ugyfelkozterulet = this.ugyfelservice.Dto[i].Kozterulet;
      this._bizonylatservice.ComplexDtoEdited.Dto.Ugyfelkozterulettipus = this.ugyfelservice.Dto[i].Kozterulettipus;
      this._bizonylatservice.ComplexDtoEdited.Dto.Ugyfelhazszam = this.ugyfelservice.Dto[i].Hazszam;
    }

    this.onStopzoom();
  }
  onStopzoom() {
    this.ugyfelservice.zoom = false;

    if (this.ugyfelservice.zoomsource === ZoomSources.Irat) {
      this._iratservice.SzerkesztesMode = IratSzerkesztesMode.Blank;
    }
    if (this.ugyfelservice.zoomsource === ZoomSources.Projekt) {
      this._projektservice.SzerkesztesMode = ProjektSzerkesztesMode.Blank;
    }
    if (this.ugyfelservice.zoomsource === ZoomSources.Bizonylat) {
      this._bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.List;
    }
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

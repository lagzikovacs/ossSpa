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

@Component({
  selector: 'app-ugyfel-list',
  templateUrl: './ugyfel-list.component.html'
})
export class UgyfelListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla') tabla: UgyfelTablaComponent;

  csoportszurok = ['Mind', 'Kiemelt'];
  szurok = ['Név', 'Cég', 'Beosztás', 'Helységnév', 'Telefon', 'Email', 'Egyéb link', 'Ajánlotta', 'Id'];
  szempontok = [
    Szempont.Nev, Szempont.Ceg, Szempont.Beosztas, Szempont.Telepules, Szempont.UgyfelTelefonszam, Szempont.UgyfelEmail,
    Szempont.Egyeblink, Szempont.Ajanlo, Szempont.Kod
  ];
  jog = false;
  ugyfelservice: UgyfelService;


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
    if (this.ugyfelservice.zoom) {
      this.onKereses();
    }
  }

  onKereses() {
    this.ugyfelservice.Dto = new Array<UgyfelDto>();
    this.ugyfelservice.DtoSelectedIndex = -1;
    this.ugyfelservice.osszesrekord = 0;

    this.ugyfelservice.elsokereses = true;
    this.ugyfelservice.up.rekordtol = 0;
    this.ugyfelservice.up.csoport = this.ugyfelservice.csoportszempont;
    this.ugyfelservice.up.fi = new Array<SzMT>();
    this.ugyfelservice.up.fi.push(new SzMT(this.szempontok[this.ugyfelservice.szempont], this.ugyfelservice.minta));

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }
  onKeresesTovabb() {
    this.eppFrissit = true;
    this.ugyfelservice.Select(this.ugyfelservice.up)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.ugyfelservice.elsokereses) {
          this.ugyfelservice.Dto = res.Result;
          this.ugyfelservice.elsokereses = false;
        } else {
          const buf = [...this.ugyfelservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.ugyfelservice.Dto = buf;
        }
        this.ugyfelservice.osszesrekord = res.OsszesRekord;

        this.ugyfelservice.up.rekordtol += this.ugyfelservice.up.lapmeret;
        this.eppFrissit = false;

        if (this.ugyfelservice.zoom) {
          window.scrollTo(0, document.body.scrollHeight);
        }
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

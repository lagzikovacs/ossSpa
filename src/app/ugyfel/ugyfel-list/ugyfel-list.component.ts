import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Szempont} from '../../enums/szempont';
import {UgyfelService} from '../ugyfel.service';
import {UgyfelDto} from '../ugyfeldto';
import {SzMT} from '../../dtos/szmt';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {UgyfelTablaComponent} from '../ugyfel-tabla/ugyfel-tabla.component';
import {environment} from '../../../environments/environment';
import {UgyfelParameter} from '../ugyfelparameter';
import {deepCopy} from '../../tools/deepCopy';
import {EgyMode} from '../../enums/egymode';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-ugyfel-list',
  templateUrl: './ugyfel-list.component.html',
  animations: [rowanimation]
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

  Dto = new Array<UgyfelDto>();
  DtoSelectedIndex = -1;

  egymode = EgyMode.Reszletek;

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
    this.egymode = EgyMode.Reszletek;
  }

  doNav(i: number) {
    this.egymode = i;
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

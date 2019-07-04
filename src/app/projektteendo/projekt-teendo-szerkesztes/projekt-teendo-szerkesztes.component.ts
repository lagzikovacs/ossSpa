import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TeendoService} from '../../primitiv/teendo/teendo.service';
import {FelhasznaloService} from '../../primitiv/felhasznalo/felhasznalo.service';
import {ProjektteendoService} from '../projektteendo.service';
import {ZoomSources} from '../../enums/zoomsources';
import * as moment from 'moment';
import {TeendoZoomParameter} from '../../primitiv/teendo/teendozoomparameter';
import {ProjektService} from '../../projekt/projekt.service';
import {ProjektteendoSzerkesztesMode} from '../projektteendoszerkesztesmode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {propCopy} from '../../tools/propCopy';
import {deepCopy} from '../../tools/deepCopy';
import {FelhasznaloDto} from '../../primitiv/felhasznalo/felhasznalodto';

@Component({
  selector: 'app-projekt-teendo-szerkesztes',
  templateUrl: './projekt-teendo-szerkesztes.component.html'
})
export class ProjektTeendoSzerkesztesComponent implements OnInit, OnDestroy {
  projektteendoservice: ProjektteendoService;
  Hatarido: any;

  @Input() uj = false;
  @Output() eventSzerkeszteskesz = new EventEmitter<void>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(projektteendoservice: ProjektteendoService,
              private _felhasznalosevice: FelhasznaloService,
              private _teendoservice: TeendoService,
              private _projektservice: ProjektService,
              private _spinnerservice: SpinnerService,
              private _errorservice: ErrorService) {
    this.projektteendoservice = projektteendoservice;
  }

  ngOnInit() {
    this.Hatarido = moment().format('YYYY-MM-DD');

    if (this.uj) {
      this.eppFrissit = true;
      this.projektteendoservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.projektteendoservice.DtoEdited = res.Result[0];
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.projektteendoservice.DtoEdited = deepCopy(this.projektteendoservice.Dto[this.projektteendoservice.DtoSelectedIndex]);
    }
  }

  onSubmit() {
    // nem ellenőrzi, h a dedikált felhasználó létezik-e

    this.eppFrissit = true;
    this._teendoservice.ZoomCheck(new TeendoZoomParameter(this.projektteendoservice.DtoEdited.Teendokod || 0,
      this.projektteendoservice.DtoEdited.Teendo || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.projektteendoservice.DtoEdited.Hatarido = moment(this.Hatarido).toISOString(true);

        if (this.uj) {
          this.projektteendoservice.DtoEdited.Projektkod = this._projektservice.Dto[this._projektservice.DtoSelectedIndex].Projektkod;
          return this.projektteendoservice.Add(this.projektteendoservice.DtoEdited);
        } else {
          return this.projektteendoservice.Update(this.projektteendoservice.DtoEdited);
        }
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        return this.projektteendoservice.Get(res1.Result);
      })
      .then(res2 => {
        if (res2.Error !== null) {
          throw res2.Error;
        }

        if (this.uj) {
          this.projektteendoservice.Dto.unshift(res2.Result[0]);
        } else {
          propCopy(res2.Result[0], this.projektteendoservice.Dto[this.projektteendoservice.DtoSelectedIndex]);
        }

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onCancel() {
    this.eventSzerkeszteskesz.emit();
  }

  FelhasznaloZoom() {
    this.projektteendoservice.SzerkesztesMode = ProjektteendoSzerkesztesMode.FelhasznaloZoom;
  }
  onFelhasznaloSelectzoom(Dto: FelhasznaloDto) {
    this.projektteendoservice.DtoEdited.Dedikalva = Dto.Nev;
  }
  onFelhasznaloStopzoom() {
    this.projektteendoservice.SzerkesztesMode = ProjektteendoSzerkesztesMode.Blank;
  }

  TeendoZoom() {
    this._teendoservice.ekDto.minta = this.projektteendoservice.DtoEdited.Teendo || '';
    this._teendoservice.zoomsource = ZoomSources.Projektteendo;
    this._teendoservice.zoom = true;

    this.projektteendoservice.SzerkesztesMode = ProjektteendoSzerkesztesMode.TeendoZoom;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

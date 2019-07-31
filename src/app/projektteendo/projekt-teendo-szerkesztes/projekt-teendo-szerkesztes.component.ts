import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TeendoService} from '../../primitiv/teendo/teendo.service';
import {ProjektteendoService} from '../projektteendo.service';
import * as moment from 'moment';
import {TeendoZoomParameter} from '../../primitiv/teendo/teendozoomparameter';
import {ProjektteendoSzerkesztesMode} from '../projektteendoszerkesztesmode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {deepCopy} from '../../tools/deepCopy';
import {FelhasznaloDto} from '../../primitiv/felhasznalo/felhasznalodto';
import {TeendoDto} from '../../primitiv/teendo/teendodto';
import {ProjektteendoDto} from '../projektteendodto';

@Component({
  selector: 'app-projekt-teendo-szerkesztes',
  templateUrl: './projekt-teendo-szerkesztes.component.html'
})
export class ProjektTeendoSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new ProjektteendoDto();
  @Input() set DtoOriginal(value: ProjektteendoDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Input() Projektkod = -1;
  @Output() eventSzerkeszteskesz = new EventEmitter<ProjektteendoDto>();

  Hatarido: any;

  SzerkesztesMode = ProjektteendoSzerkesztesMode.Blank;

  projektteendoservice: ProjektteendoService;
  spinnerservice: SpinnerService;

  constructor(private _teendoservice: TeendoService,
              private _errorservice: ErrorService,
              spinnerservice: SpinnerService,
              projektteendoservice: ProjektteendoService) {
    this.projektteendoservice = projektteendoservice;
    this.spinnerservice = spinnerservice;
  }

  ngOnInit() {
    this.Hatarido = moment().format('YYYY-MM-DD');

    if (this.uj) {
      this.spinnerservice.eppFrissit = true;
      this.projektteendoservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.DtoEdited = res.Result[0];
          this.spinnerservice.eppFrissit = false;
        })
        .catch(err => {
          this.spinnerservice.eppFrissit = false;
          this._errorservice.Error = err;
        });
    }
  }

  onSubmit() {
    // nem ellenőrzi, h a dedikált felhasználó létezik-e

    this.spinnerservice.eppFrissit = true;
    this._teendoservice.ZoomCheck(new TeendoZoomParameter(this.DtoEdited.Teendokod || 0,
      this.DtoEdited.Teendo || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.DtoEdited.Hatarido = moment(this.Hatarido).toISOString(true);

        if (this.uj) {
          this.DtoEdited.Projektkod = this.Projektkod;
          return this.projektteendoservice.Add(this.DtoEdited);
        } else {
          return this.projektteendoservice.Update(this.DtoEdited);
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

        this.spinnerservice.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res2.Result[0]);
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onCancel() {
    this.eventSzerkeszteskesz.emit(null);
  }

  FelhasznaloZoom() {
    this.SzerkesztesMode = ProjektteendoSzerkesztesMode.FelhasznaloZoom;
  }
  onFelhasznaloSelectzoom(Dto: FelhasznaloDto) {
    this.DtoEdited.Dedikalva = Dto.Nev;
  }
  onFelhasznaloStopzoom() {
    this.SzerkesztesMode = ProjektteendoSzerkesztesMode.Blank;
  }

  TeendoZoom() {
    this.SzerkesztesMode = ProjektteendoSzerkesztesMode.TeendoZoom;
  }
  onTeendoSelectzoom(Dto: TeendoDto) {
    this.DtoEdited.Teendokod = Dto.Teendokod;
    this.DtoEdited.Teendo = Dto.Teendo1;
  }
  onTeendoStopzoom() {
    this.SzerkesztesMode = ProjektteendoSzerkesztesMode.Blank;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

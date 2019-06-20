import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeendoService} from '../../primitiv/teendo/teendo.service';
import {FelhasznaloService} from '../../primitiv/felhasznalo/felhasznalo.service';
import {ProjektteendoService} from '../projektteendo.service';
import {ZoomSources} from '../../enums/zoomsources';
import * as moment from 'moment';
import {TeendoZoomParameter} from '../../primitiv/teendo/teendozoomparameter';
import {ProjektService} from '../../projekt/projekt.service';
import {ProjektteendoEgyMode} from '../projekttendoegymode';
import {ProjektteendoContainerMode} from '../projektteendocontainermode';
import {FelhasznaloContainerMode} from '../../primitiv/felhasznalo/felhasznalocontainermode';
import {TeendoContainerMode} from '../../primitiv/teendo/teendocontainermode';
import {ProjektteendoSzerkesztesMode} from '../projektteendoszerkesztesmode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-projekt-teendo-szerkesztes',
  templateUrl: './projekt-teendo-szerkesztes.component.html'
})
export class ProjektTeendoSzerkesztesComponent implements OnInit, OnDestroy {
  projektteendoservice: ProjektteendoService;
  Hatarido: any;

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

        if (this.projektteendoservice.uj) {
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

        if (this.projektteendoservice.uj) {
          this.projektteendoservice.Dto.unshift(res2.Result[0]);
        } else {
          this.projektteendoservice.Dto[this.projektteendoservice.DtoSelectedIndex] = res2.Result[0];
        }

        this.eppFrissit = false;
        this.navigal();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  cancel() {
    this.navigal();
  }

  navigal() {
    if (this.projektteendoservice.uj) {
      this.projektteendoservice.ContainerMode = ProjektteendoContainerMode.List;
    } else {
      this.projektteendoservice.EgyMode = ProjektteendoEgyMode.Reszletek;
    }
  }

  FelhasznaloZoom() {
    this._felhasznalosevice.ekDto.minta = this.projektteendoservice.DtoEdited.Dedikalva || '';
    this._felhasznalosevice.zoomsource = ZoomSources.Projektteendo;
    this._felhasznalosevice.zoom = true;
    this._felhasznalosevice.ContainerMode = FelhasznaloContainerMode.List;

    this.projektteendoservice.SzerkesztesMode = ProjektteendoSzerkesztesMode.FelhasznaloZoom;
  }
  TeendoZoom() {
    this._teendoservice.ekDto.minta = this.projektteendoservice.DtoEdited.Teendo || '';
    this._teendoservice.zoomsource = ZoomSources.Projektteendo;
    this._teendoservice.zoom = true;
    this._teendoservice.ContainerMode = TeendoContainerMode.List;

    this.projektteendoservice.SzerkesztesMode = ProjektteendoSzerkesztesMode.TeendoZoom;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

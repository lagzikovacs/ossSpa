import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TeendoService} from '../../../teendo/teendo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {FelhasznaloService} from '../../../felhasznalo/felhasznalo.service';
import {ProjektteendoService} from '../projektteendo.service';
import {ZoomSources} from '../../../enums/zoomsources';
import * as moment from 'moment';
import {TeendoZoomParameter} from '../../../teendo/teendozoomparameter';
import {ProjektService} from '../../projekt/projekt.service';
import {ProjektteendoEgyMode} from '../projekttendoegymode';
import {ProjektteendoContainerMode} from '../projektteendocontainermode';
import {FelhasznaloContainerMode} from '../../../felhasznalo/felhasznalocontainermode';
import {TeendoContainerMode} from '../../../teendo/teendocontainermode';
import {ProjektteendoSzerkesztesMode} from '../projektteendoszerkesztesmode';

@Component({
  selector: 'app-projekt-teendo-szerkesztes',
  templateUrl: './projekt-teendo-szerkesztes.component.html',
  styleUrls: ['./projekt-teendo-szerkesztes.component.css']
})
export class ProjektTeendoSzerkesztesComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektteendoservice: ProjektteendoService;
  eppFrissit = false;
  Hatarido: any;

  constructor(projektteendoservice: ProjektteendoService,
              private _felhasznalosevice: FelhasznaloService,
              private _teendoservice: TeendoService,
              private _projektservice: ProjektService) {
    this.projektteendoservice = projektteendoservice;
  }

  ngOnInit() {
    this.Hatarido = moment().format('YYYY-MM-DD');
  }

  onSubmit() {
    // nem ellenőrzi, h a dedikált felhasználó létezik-e

    this._teendoservice.ZoomCheck(new TeendoZoomParameter(this.projektteendoservice.DtoEdited.TEENDOKOD || 0,
      this.projektteendoservice.DtoEdited.TEENDO || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.projektteendoservice.DtoEdited.HATARIDO = moment(this.Hatarido).toISOString(true);

        if (this.projektteendoservice.uj) {
          this.projektteendoservice.DtoEdited.PROJEKTKOD = this._projektservice.Dto[this._projektservice.DtoSelectedIndex].Projektkod;
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
        this.errormodal.show(err);
        this.eppFrissit = false;
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
    this._felhasznalosevice.ekDto.minta = this.projektteendoservice.DtoEdited.DEDIKALVA || '';
    this._felhasznalosevice.zoomsource = ZoomSources.Projektteendo;
    this._felhasznalosevice.zoom = true;
    this._felhasznalosevice.ContainerMode = FelhasznaloContainerMode.List;

    this.projektteendoservice.SzerkesztesMode = ProjektteendoSzerkesztesMode.FelhasznaloZoom;
  }
  TeendoZoom() {
    this._teendoservice.ekDto.minta = this.projektteendoservice.DtoEdited.TEENDO || '';
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

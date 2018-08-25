import {Component, OnInit, ViewChild} from '@angular/core';
import {TeendoService} from '../../../../../../services/torzs/primitiv/teendo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../../../tools/errormodal/errormodal.component';
import {FelhasznaloService} from '../../../../../../services/torzs/primitiv/felhasznalo.service';
import {ProjektteendoService} from '../../../../../../services/eszkoz/projekt/projektteendo.service';
import {ZoomSources} from '../../../../../../enums/zoomsources';
import * as moment from 'moment';
import {TeendoZoomParameter} from '../../../../../../dtos/primitiv/teendo/teendozoomparameter';
import {ProjektService} from '../../../../../../services/eszkoz/projekt/projekt.service';

@Component({
  selector: 'app-projekt-teendo-szerkesztes',
  templateUrl: './projekt-teendo-szerkesztes.component.html',
  styleUrls: ['./projekt-teendo-szerkesztes.component.css']
})
export class ProjektTeendoSzerkesztesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektteendoservice: ProjektteendoService;
  eppFrissit = false;
  Hatarido: any;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              projektteendoservice: ProjektteendoService,
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
          this.projektteendoservice.DtoEdited.PROJEKTKOD = this._projektservice.Dto[this._projektservice.DtoSelectedIndex].PROJEKTKOD;
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
      this._router.navigate(['../projektteendo'], {relativeTo: this._route});
    } else {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }

  FelhasznaloZoom() {
    this._felhasznalosevice.ekDto.minta = this.projektteendoservice.DtoEdited.DEDIKALVA || '';
    this._felhasznalosevice.zoomsource = ZoomSources.Projektteendo;
    this._felhasznalosevice.zoom = true;
    this._router.navigate(['felhasznalo'], {relativeTo: this._route});
  }
  TeendoZoom() {
    this._teendoservice.ekDto.minta = this.projektteendoservice.DtoEdited.TEENDO || '';
    this._teendoservice.zoomsource = ZoomSources.Projektteendo;
    this._teendoservice.zoom = true;
    this._router.navigate(['teendo'], {relativeTo: this._route});
  }
}

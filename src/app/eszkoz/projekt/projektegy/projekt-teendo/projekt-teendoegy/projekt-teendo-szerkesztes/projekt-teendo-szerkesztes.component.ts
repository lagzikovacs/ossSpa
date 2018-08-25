import {Component, OnInit, ViewChild} from '@angular/core';
import {TeendoService} from '../../../../../../services/torzs/primitiv/teendo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../../../tools/errormodal/errormodal.component';
import {FelhasznaloService} from '../../../../../../services/torzs/primitiv/felhasznalo.service';
import {ProjektteendoService} from '../../../../../../services/eszkoz/projekt/projektteendo.service';
import {ZoomSources} from '../../../../../../enums/zoomsources';
import * as moment from 'moment';

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
              private _teendoservice: TeendoService) {
    this.projektteendoservice = projektteendoservice;
  }

  ngOnInit() {
    this.Hatarido = moment().format('YYYY-MM-DD');
  }

  onSubmit() {

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

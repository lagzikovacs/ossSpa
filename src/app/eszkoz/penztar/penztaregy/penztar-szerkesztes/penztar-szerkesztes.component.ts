import {Component, OnInit, ViewChild} from '@angular/core';
import {PenztarService} from '../../../../services/eszkoz/penztar/penztar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';
import {PenznemService} from '../../../../penznem/penznem.service';
import {ZoomSources} from '../../../../enums/zoomsources';
import {PenznemZoomParameter} from '../../../../dtos/primitiv/penznem/penznemzoomparameter';

@Component({
  selector: 'app-penztar-szerkesztes',
  templateUrl: './penztar-szerkesztes.component.html',
  styleUrls: ['./penztar-szerkesztes.component.css']
})
export class PenztarSzerkesztesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  penztarservice: PenztarService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              penztarservice: PenztarService,
              private _penznemservice: PenznemService) {
    this.penztarservice = penztarservice;
  }

  ngOnInit() {
    // TODO hibás állapotok kiszűrése
  }

  onSubmit() {
    this.eppFrissit = true;
    this._penznemservice.ZoomCheck(new PenznemZoomParameter(this.penztarservice.DtoEdited.PENZNEMKOD || 0,
      this.penztarservice.DtoEdited.PENZNEM || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        if (this.penztarservice.uj) {
          return this.penztarservice.Add(this.penztarservice.DtoEdited);
        } else {
          return this.penztarservice.Update(this.penztarservice.DtoEdited);
        }
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        return this.penztarservice.Get(res1.Result);
      })
      .then(res2 => {
        if (res2.Error !== null) {
          throw res2.Error;
        }

        if (this.penztarservice.uj) {
          this.penztarservice.Dto.unshift(res2.Result[0]);
        } else {
          this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex] = res2.Result[0];
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
    if (this.penztarservice.uj) {
      this._router.navigate(['../penztar'], {relativeTo: this._route});
    } else {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }
  PenznemZoom() {
    this._penznemservice.ekDto.minta = this.penztarservice.DtoEdited.PENZNEM || '';
    this._penznemservice.zoomsource = ZoomSources.Penztar;
    this._penznemservice.zoom = true;
    this._router.navigate(['penznem'], {relativeTo: this._route});
  }
}

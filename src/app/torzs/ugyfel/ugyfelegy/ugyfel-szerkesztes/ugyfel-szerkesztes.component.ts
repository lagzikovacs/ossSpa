import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';
import {UgyfelService} from '../../../../services/torzs/ugyfel.service';
import {UgyfelDto} from '../../../../dtos/torzs/ugyfel/ugyfeldto';
import {HelysegService} from '../../../../services/torzs/primitiv/helyseg.service';
import {ZoomSources} from '../../../../enums/zoomsources';
import {HelysegZoomParameter} from '../../../../dtos/primitiv/helyseg/helysegzoomparameter';

@Component({
  selector: 'app-ugyfel-szerkesztes',
  templateUrl: './ugyfel-szerkesztes.component.html',
  styleUrls: ['./ugyfel-szerkesztes.component.css']
})
export class UgyfelSzerkesztesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  ugyfelservice: UgyfelService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              ugyfelservice: UgyfelService,
              private _helysegservice: HelysegService) {
    this.ugyfelservice = ugyfelservice;
  }

  ngOnInit() {
    // TODO hibás állapotok kiszűrése
  }

  onSubmit() {
    this.eppFrissit = true;
    this._helysegservice.ZoomCheck(new HelysegZoomParameter(this.ugyfelservice.DtoEdited.HELYSEGKOD || 0,
      this.ugyfelservice.DtoEdited.HELYSEGNEV || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        if (this.ugyfelservice.uj) {
          return this.ugyfelservice.Add(this.ugyfelservice.DtoEdited);
        } else {
          return this.ugyfelservice.Update(this.ugyfelservice.DtoEdited);
        }
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        return this.ugyfelservice.Get(res1.Result);
      })
      .then(res2 => {
        if (res2.Error !== null) {
          throw res2.Error;
        }

        if (this.ugyfelservice.uj) {
          this.ugyfelservice.Dto.unshift(res2.Result[0]);
        } else {
          this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex] = res2.Result[0];
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
    if (this.ugyfelservice.uj) {
      this._router.navigate(['../ugyfel'], {relativeTo: this._route});
    } else {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }
  HelysegZoom() {
    this._helysegservice.ekDto.minta = this.ugyfelservice.DtoEdited.HELYSEGNEV || '';
    this._helysegservice.zoomsource = ZoomSources.Ugyfel;
    this._helysegservice.zoom = true;
    this._router.navigate(['helyseg'], {relativeTo: this._route});
  }
}

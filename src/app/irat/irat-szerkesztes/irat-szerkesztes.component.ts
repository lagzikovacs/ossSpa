import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {IratService} from '../irat.service';
import {IrattipusService} from '../../irattipus/irattipus.service';
import {ZoomSources} from '../../enums/zoomsources';
import * as moment from 'moment';
import {NumberResult} from '../../dtos/numberresult';
import {UgyfelService} from "../../ugyfel/ugyfel.service";

@Component({
  selector: 'app-irat-szerkesztes',
  templateUrl: './irat-szerkesztes.component.html',
  styleUrls: ['./irat-szerkesztes.component.css']
})
export class IratSzerkesztesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  iratservice: IratService;
  eppFrissit = false;
  Keletkezett: any;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _irattipusservice: IrattipusService,
              private _ugyfelservice: UgyfelService,
              iratservice: IratService) {
    this.iratservice = iratservice;
  }

  ngOnInit() {
    if (this.iratservice.uj) {
      this.Keletkezett = moment().format('YYYY-MM-DD');
    } else {
      this.Keletkezett = moment(this.iratservice.DtoEdited.KELETKEZETT).format('YYYY-MM-DD');
    }
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.iratservice.uj) {
      p = this.iratservice.Add(this.iratservice.DtoEdited);
    } else {
      p = this.iratservice.Update(this.iratservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.iratservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.iratservice.uj) {
          this.iratservice.Dto.unshift(res1.Result[0]);
        } else {
          this.iratservice.Dto[this.iratservice.DtoSelectedIndex] = res1.Result[0];
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
    if (this.iratservice.uj) {
      this._router.navigate(['../irat-list'], {relativeTo: this._route});
    } else {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }

  IrattipusZoom() {
    this._irattipusservice.ekDto.minta = this.iratservice.DtoEdited.IRATTIPUS || '';
    this._irattipusservice.zoomsource = ZoomSources.Irat;
    this._irattipusservice.zoom = true;
    this._router.navigate(['irattipus-list'], {relativeTo: this._route});
  }

  UgyfelZoom() {
    this._ugyfelservice.szempont = 0;
    this._ugyfelservice.minta = this.iratservice.DtoEdited.UGYFELNEV || '';
    this._ugyfelservice.zoomsource = ZoomSources.Irat;
    this._ugyfelservice.zoom = true;
    this._router.navigate(['ugyfel-list'], {relativeTo: this._route});
  }
}

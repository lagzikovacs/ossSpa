import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {IratService} from '../irat.service';
import {IrattipusService} from '../../../primitiv/irattipus/irattipus.service';
import {ZoomSources} from '../../../enums/zoomsources';
import * as moment from 'moment';
import {NumberResult} from '../../../dtos/numberresult';
import {UgyfelService} from '../../../ugyfel/ugyfel.service';
import {IratContainerMode} from '../iratcontainermode';
import {IrattipusContainerMode} from '../../../primitiv/irattipus/irattipuscontainermode';
import {UgyfelContainerMode} from '../../../ugyfel/ugyfelcontainermode';
import {IratSzerkesztesMode} from '../iratszerkesztesmode';
import {IratEgyMode} from '../irategymode';
import {IrattipusZoomParameter} from '../../../primitiv/irattipus/irattipuszoomparameter';
import {EmptyResult} from '../../../dtos/emptyresult';
import {UgyfelZoomParameter} from '../../../ugyfel/ugyfelzoomparameter';

@Component({
  selector: 'app-irat-szerkesztes',
  templateUrl: './irat-szerkesztes.component.html',
  styleUrls: ['./irat-szerkesztes.component.css']
})
export class IratSzerkesztesComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  iratservice: IratService;
  eppFrissit = false;
  Keletkezett: any;

  constructor(private _irattipusservice: IrattipusService,
              private _ugyfelservice: UgyfelService,
              iratservice: IratService) {
    this.iratservice = iratservice;
  }

  ngOnInit() {
    if (this.iratservice.uj) {
      this.Keletkezett = moment().format('YYYY-MM-DD');
    } else {
      this.Keletkezett = moment(this.iratservice.DtoEdited.Keletkezett).format('YYYY-MM-DD');
    }
  }

  onSubmit() {
    this.eppFrissit = true;

    this._irattipusservice.ZoomCheck(new IrattipusZoomParameter(this.iratservice.DtoEdited.Irattipuskod,
      this.iratservice.DtoEdited.Irattipus))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.iratservice.DtoEdited.Ugyfelnev || '' !== '') {
          return this._ugyfelservice.ZoomCheck(new UgyfelZoomParameter(this.iratservice.DtoEdited.Ugyfelkod,
            this.iratservice.DtoEdited.Ugyfelnev));
        } else {
          return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
        }
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.iratservice.uj) {
          return this.iratservice.Add(this.iratservice.DtoEdited);
        } else {
          return this.iratservice.Update(this.iratservice.DtoEdited);
        }
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        return this.iratservice.Get(res2.Result);
      })
      .then(res3 => {
        if (res3.Error != null) {
          throw res3.Error;
        }

        if (this.iratservice.uj) {
          this.iratservice.Dto.unshift(res3.Result[0]);
        } else {
          this.iratservice.Dto[this.iratservice.DtoSelectedIndex] = res3.Result[0];
        }

        this.eppFrissit = false;
        this.navigal();
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    if (this.iratservice.uj) {
      this.iratservice.ContainerMode = IratContainerMode.List;
    } else {
      this.iratservice.EgyMode = IratEgyMode.Reszletek;
    }
  }

  IrattipusZoom() {
    this._irattipusservice.ekDto.minta = this.iratservice.DtoEdited.Irattipus || '';
    this._irattipusservice.zoomsource = ZoomSources.Irat;
    this._irattipusservice.zoom = true;
    this._irattipusservice.ContainerMode = IrattipusContainerMode.List;

    this.iratservice.SzerkesztesMode = IratSzerkesztesMode.IrattipusZoom;
  }

  UgyfelZoom() {
    this._ugyfelservice.szempont = 0;
    this._ugyfelservice.minta = this.iratservice.DtoEdited.Ugyfelnev || '';
    this._ugyfelservice.zoomsource = ZoomSources.Irat;
    this._ugyfelservice.zoom = true;
    this._ugyfelservice.ContainerMode = UgyfelContainerMode.List;

    this.iratservice.SzerkesztesMode = IratSzerkesztesMode.UgyfelZoom;
  }
  UgyfelTorles() {
    this.iratservice.DtoEdited.Ugyfelkod = null;
    this.iratservice.DtoEdited.Ugyfelnev = null;
    this.iratservice.DtoEdited.Ugyfelcim = null;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

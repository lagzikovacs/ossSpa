import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {BizonylatkapcsolatService} from '../bizonylatkapcsolat.service';
import {IratService} from '../../../irat/irat/irat.service';
import {IrattipusService} from '../../../irattipus/irattipus.service';
import {IrattipusContainerMode} from '../../../irattipus/irattipuscontainermode';
import {ZoomSources} from '../../../enums/zoomsources';
import {BizonylatService} from '../../bizonylat.service';
import {BizonylatKapcsolatParam} from '../bizonylatkapcsolatparam';
import {BizonylatKapcsolatContainerMode} from '../bizonylatkapcsolatcontainermode';
import {BizonylatKapcsolatSzerkesztesMode} from '../bizonylatkapcsolatszerkesztesmode';

@Component({
  selector: 'app-bizonylat-irat-uj',
  templateUrl: './bizonylat-irat-uj.component.html',
  styleUrls: ['./bizonylat-irat-uj.component.css']
})
export class BizonylatIratUjComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  bizonylatkapcsolatservice: BizonylatkapcsolatService;
  eppFrissit = false;
  Keletkezett: any;

  constructor(private _irattipusservice: IrattipusService,
              private _iratservice: IratService,
              private _bizonylatservice: BizonylatService,
              bizonylatkapcsolatservice: BizonylatkapcsolatService) {
    this.bizonylatkapcsolatservice = bizonylatkapcsolatservice;
  }

  ngOnInit() {
    this.Keletkezett = moment().format('YYYY-MM-DD');

    this.eppFrissit = true;
    this._iratservice.CreateNew()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatkapcsolatservice.UjIratDto = res.Result[0];
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  IrattipusZoom() {
    this._irattipusservice.ekDto.minta = this.bizonylatkapcsolatservice.UjIratDto.Irattipus || '';
    this._irattipusservice.zoomsource = ZoomSources.Bizonylatirat;
    this._irattipusservice.zoom = true;
    this._irattipusservice.ContainerMode = IrattipusContainerMode.List;

    this.bizonylatkapcsolatservice.SzerkesztesMode = BizonylatKapcsolatSzerkesztesMode.IrattipusZoom;
  }

  onSubmit() {
    this.bizonylatkapcsolatservice.UjIratDto.Ugyfelkod = this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].Ugyfelkod;
    this.bizonylatkapcsolatservice.UjIratDto.Keletkezett = moment(this.Keletkezett).toISOString(true);

    // TODO zoomcheck
    this._iratservice.Add(this.bizonylatkapcsolatservice.UjIratDto)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.bizonylatkapcsolatservice.AddIratToBizonylat(new BizonylatKapcsolatParam(
          this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].Bizonylatkod,
          res.Result
        ));
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        return this.bizonylatkapcsolatservice.Get(res1.Result);
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        this.bizonylatkapcsolatservice.Dto.unshift(res2.Result[0]);

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
    this.bizonylatkapcsolatservice.ContainerMode = BizonylatKapcsolatContainerMode.List;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

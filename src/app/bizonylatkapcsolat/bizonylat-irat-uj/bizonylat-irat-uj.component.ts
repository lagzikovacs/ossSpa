import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {BizonylatkapcsolatService} from '../bizonylatkapcsolat.service';
import {IratService} from '../../irat/irat.service';
import {IrattipusService} from '../../primitiv/irattipus/irattipus.service';
import {IrattipusContainerMode} from '../../primitiv/irattipus/irattipuscontainermode';
import {ZoomSources} from '../../enums/zoomsources';
import {BizonylatService} from '../../bizonylat/bizonylat.service';
import {BizonylatKapcsolatParam} from '../bizonylatkapcsolatparam';
import {BizonylatKapcsolatContainerMode} from '../bizonylatkapcsolatcontainermode';
import {BizonylatKapcsolatSzerkesztesMode} from '../bizonylatkapcsolatszerkesztesmode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-bizonylat-irat-uj',
  templateUrl: './bizonylat-irat-uj.component.html'
})
export class BizonylatIratUjComponent implements OnInit, OnDestroy {
  bizonylatkapcsolatservice: BizonylatkapcsolatService;
  Keletkezett: any;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _irattipusservice: IrattipusService,
              private _iratservice: IratService,
              private _bizonylatservice: BizonylatService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
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
        this.eppFrissit = false;
        this._errorservice.Error = err;
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

    this.eppFrissit = true;
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
        this._errorservice.Error = err;
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

import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {IrattipusService} from '../../primitiv/irattipus/irattipus.service';
import {ZoomSources} from '../../enums/zoomsources';
import {IratService} from '../../irat/irat.service';
import {ProjektKapcsolatParameter} from '../projektkapcsolatparameter';
import {BizonylatesIratContainerMode} from '../bizonylatesiratcontainermode';
import {BizonylatesiratSzerkesztesMode} from '../bizonylatesiratszerkesztesmode';
import {IrattipusContainerMode} from '../../primitiv/irattipus/irattipuscontainermode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-projektkapcsolat-ujirat',
  templateUrl: './projektkapcsolat-ujirat.component.html'
})
export class ProjektkapcsolatUjiratComponent implements OnInit, OnDestroy {
  projektkapcsolatservice: ProjektkapcsolatService;
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
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              projektkapcsolatservice: ProjektkapcsolatService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  ngOnInit() {
    this.Keletkezett = moment().format('YYYY-MM-DD');

    this.eppFrissit = true;
    this._iratservice.CreateNew()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.projektkapcsolatservice.UjIratDto = res.Result[0];
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  IrattipusZoom() {
    this._irattipusservice.ekDto.minta = this.projektkapcsolatservice.UjIratDto.Irattipus || '';
    this._irattipusservice.zoomsource = ZoomSources.Projektirat;
    this._irattipusservice.zoom = true;
    this._irattipusservice.ContainerMode = IrattipusContainerMode.List;

    this.projektkapcsolatservice.SzerkesztesMode = BizonylatesiratSzerkesztesMode.IrattipusZoom;
  }

  onSubmit() {
    this.projektkapcsolatservice.UjIratDto.Ugyfelkod = this.projektkapcsolatservice.UgyfelKod;
    this.projektkapcsolatservice.UjIratDto.Keletkezett = moment(this.Keletkezett).toISOString(true);

    // TODO zoomcheck
    this.eppFrissit = true;
    this._iratservice.Add(this.projektkapcsolatservice.UjIratDto)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.projektkapcsolatservice.AddIratToProjekt(new ProjektKapcsolatParameter(
          this.projektkapcsolatservice.ProjektKod,
          0,
          res.Result,
          undefined
        ));
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        return this.projektkapcsolatservice.Get(res1.Result);
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        this.projektkapcsolatservice.Dto.unshift(res2.Result[0]);

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
    this.projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.List;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

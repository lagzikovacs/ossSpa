import {Component, OnDestroy} from '@angular/core';
import {ProjektkapcsolatService} from '../../projektkapcsolat/projektkapcsolat.service';
import {AjanlatSzerkesztesMode} from '../ajanlatszerkesztesmode';
import {AjanlatContainerMode} from '../ajanlatcontainermode';
import {CikkService} from '../../cikk/cikk.service';
import {ZoomSources} from '../../enums/zoomsources';
import {AjanlatService} from '../ajanlat.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-ajanlat-tetel',
  templateUrl: './ajanlat-tetel.html'
})
export class AjanlatTetelComponent implements OnDestroy {
  ajanlatservice: AjanlatService;
  projektkapcsolatservice: ProjektkapcsolatService;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _cikkservice: CikkService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              ajanlatservice: AjanlatService,
              projektkapcsolatservice: ProjektkapcsolatService) {
    this.ajanlatservice = ajanlatservice;
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  CikkZoom() {
    this._cikkservice.szempont = 0;
    this._cikkservice.minta =
      this.ajanlatservice.AjanlatParam.AjanlatBuf[this.ajanlatservice.AjanlattetelIndex].CikkNev || '';
    this._cikkservice.zoomsource = ZoomSources.Ajanlat;
    this._cikkservice.zoom = true;

    this.ajanlatservice.AjanlatSzerkesztesMode = AjanlatSzerkesztesMode.CikkZoom;
  }

  onSubmit() {
    this.eppFrissit = true;

    this.ajanlatservice.AjanlatCalc(this.ajanlatservice.AjanlatParam)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.ajanlatservice.AjanlatParam = res.Result;

        this.eppFrissit = false;
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
    this.ajanlatservice.AjanlatSzerkesztesMode = AjanlatSzerkesztesMode.Blank;
    this.ajanlatservice.AjanlatContainerMode = AjanlatContainerMode.List;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

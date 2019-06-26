import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {BizonylatSzerkesztesMode} from '../bizonylatszerkesztesmode';
import {CikkService} from '../../cikk/cikk.service';
import {MeService} from '../../primitiv/me/me.service';
import {AfakulcsService} from '../../primitiv/afakulcs/afakulcs.service';
import {TermekdijService} from '../../primitiv/termekdij/termekdij.service';
import {ZoomSources} from '../../enums/zoomsources';
import {BizonylattetelSzerkesztesMode} from '../bizonylattetelszerkesztesmode';
import {BruttobolParam} from '../bruttobolparam';
import {CikkZoomParameter} from '../../cikk/cikkzoomparameter';
import {EmptyResult} from '../../dtos/emptyresult';
import {TermekdijZoomParameter} from '../../primitiv/termekdij/termekdijzoomparameter';
import {AfakulcsZoomParameter} from '../../primitiv/afakulcs/afakulcszoomparameter';
import {MeZoomParameter} from '../../primitiv/me/mezoomparameter';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-bizonylat-tetel-szerkesztes',
  templateUrl: './bizonylat-tetel-szerkesztes.component.html'
})
export class BizonylatTetelSzerkesztesComponent implements OnDestroy {

  bizonylatservice: BizonylatService;
  bruttoosszeg = 0;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _cikkservice: CikkService,
              private _meservice: MeService,
              private _afakulcsservice: AfakulcsService,
              private _termekdijservice: TermekdijService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              private _cdr: ChangeDetectorRef,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  CikkZoom() {
    this._cikkservice.szempont = 0;
    this._cikkservice.minta = this.bizonylatservice.TetelDtoEdited.Megnevezes || '';
    this._cikkservice.zoomsource = ZoomSources.Bizonylattetel;
    this._cikkservice.zoom = true;

    this.bizonylatservice.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.CikkZoom;
    this._cdr.detectChanges();
  }
  MeZoom() {
    this._meservice.ekDto.minta = this.bizonylatservice.TetelDtoEdited.Me || '';
    this._meservice.zoomsource = ZoomSources.Bizonylattetel;
    this._meservice.zoom = true;

    this.bizonylatservice.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.MeZoom;
    this._cdr.detectChanges();
  }
  AfaZoom() {
    this._afakulcsservice.ekDto.minta = this.bizonylatservice.TetelDtoEdited.Afakulcs || '';
    this._afakulcsservice.zoomsource = ZoomSources.Bizonylattetel;
    this._afakulcsservice.zoom = true;

    this.bizonylatservice.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.AfakulcsZoom;
    this._cdr.detectChanges();
  }
  TermekdijZoom() {
    this._termekdijservice.ekDto.minta = this.bizonylatservice.TetelDtoEdited.Termekdijkt || '';
    this._termekdijservice.zoomsource = ZoomSources.Bizonylattetel;
    this._termekdijservice.zoom = true;

    this.bizonylatservice.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.TermekdijZoom;
    this._cdr.detectChanges();
  }
  TermekdijTorles() {
    this.bizonylatservice.TetelDtoEdited.Termekdijkod = null;
    this.bizonylatservice.TetelDtoEdited.Termekdijkt = null;
    this.bizonylatservice.TetelDtoEdited.Termekdijmegnevezes = null;
    this.bizonylatservice.TetelDtoEdited.Termekdijegysegar = null;
  }

  bruttobol() {
    this.eppFrissit = true;
    this.bizonylatservice.Bruttobol(new BruttobolParam(this.bizonylatservice.TetelDtoEdited, this.bruttoosszeg))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatservice.TetelDtoEdited = res.Result[0];
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  tetelcalc(e: any) {
    this.eppFrissit = true;
    this.bizonylatservice.BizonylattetelCalc(this.bizonylatservice.TetelDtoEdited)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatservice.TetelDtoEdited = res.Result[0];
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onSubmit() {
    this.eppFrissit = true;
    this._cikkservice.ZoomCheck(new CikkZoomParameter(this.bizonylatservice.TetelDtoEdited.Cikkkod || 0,
            this.bizonylatservice.TetelDtoEdited.Megnevezes || ''))
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        return this._meservice.ZoomCheck(new MeZoomParameter(this.bizonylatservice.TetelDtoEdited.Mekod || 0,
          this.bizonylatservice.TetelDtoEdited.Me || ''));
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        return this._afakulcsservice.ZoomCheck(new AfakulcsZoomParameter(this.bizonylatservice.TetelDtoEdited.Afakulcskod || 0,
          this.bizonylatservice.TetelDtoEdited.Afakulcs || ''));
      })
      .then(res3 => {
        if (res3.Error != null) {
          throw res3.Error;
        }

        if ((this.bizonylatservice.TetelDtoEdited.Termekdijkt || '') !== '') {
          return this._termekdijservice.ZoomCheck(new TermekdijZoomParameter(this.bizonylatservice.TetelDtoEdited.Termekdijkod || 0,
            this.bizonylatservice.TetelDtoEdited.Termekdijkt || ''));
        } else {
          this.bizonylatservice.TetelDtoEdited.Termekdijkod = undefined;
          this.bizonylatservice.TetelDtoEdited.Termekdijkt = undefined;
          this.bizonylatservice.TetelDtoEdited.Termekdijmegnevezes = undefined;
          this.bizonylatservice.TetelDtoEdited.Termekdijegysegar = undefined;
          return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
        }
      })
      .then(res4 => {
        if (res4.Error != null) {
          throw res4.Error;
        }

        return this.bizonylatservice.BizonylattetelCalc(this.bizonylatservice.TetelDtoEdited);
      })
      .then(res5 => {
        if (res5.Error != null) {
          throw res5.Error;
        }

        if (this.bizonylatservice.teteluj) {
          // a lista végére teszi, h a sorrend a user szándékának feleljen meg
          this.bizonylatservice.ComplexDtoEdited.LstTetelDto.push(res5.Result[0]);
        } else {
          this.bizonylatservice.ComplexDtoEdited.LstTetelDto[this.bizonylatservice.TetelDtoSelectedIndex] = res5.Result[0];
        }

        return this.bizonylatservice.SumEsAfaEsTermekdij(this.bizonylatservice.ComplexDtoEdited);
      })
      .then(res6 => {
        if (res6.Error != null) {
          throw res6.Error;
        }

        this.bizonylatservice.ComplexDtoEdited = res6.Result[0];

        this.eppFrissit = false;
        this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.List;
        this._cdr.detectChanges();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  cancel() {
    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.List;
    this._cdr.detectChanges();
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

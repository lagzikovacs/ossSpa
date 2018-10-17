import {Component, OnDestroy, ViewChild} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {BizonylatSzerkesztesMode} from '../bizonylatszerkesztesmode';
import {CikkService} from '../../cikk/cikk.service';
import {MeService} from '../../me/me.service';
import {AfakulcsService} from '../../afakulcs/afakulcs.service';
import {TermekdijService} from '../../termekdij/termekdij.service';
import {ZoomSources} from '../../enums/zoomsources';
import {CikkContainerMode} from '../../cikk/cikkcontainermode';
import {MeContainerMode} from '../../me/mecontainermode';
import {AfakulcsContainerMode} from '../../afakulcs/afakulcscontainermode';
import {TermekdijContainerMode} from '../../termekdij/termekdijcontainermode';
import {BizonylattetelSzerkesztesMode} from '../bizonylattetelszerkesztesmode';
import {BruttobolParam} from '../bruttobolparam';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {CikkZoomParameter} from '../../cikk/cikkzoomparameter';
import {EmptyResult} from '../../dtos/emptyresult';
import {TermekdijZoomParameter} from '../../termekdij/termekdijzoomparameter';
import {AfakulcsZoomParameter} from '../../afakulcs/afakulcszoomparameter';
import {MeZoomParameter} from '../../me/mezoomparameter';

@Component({
  selector: 'app-bizonylat-tetel-szerkesztes',
  templateUrl: './bizonylat-tetel-szerkesztes.component.html',
  styleUrls: ['./bizonylat-tetel-szerkesztes.component.css']
})
export class BizonylatTetelSzerkesztesComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  bizonylatservice: BizonylatService;
  eppFrissit = false;
  bruttoosszeg = 0;

  constructor(private _cikkservice: CikkService,
              private _meservice: MeService,
              private _afakulcsservice: AfakulcsService,
              private _termekdijservice: TermekdijService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  CikkZoom() {
    this._cikkservice.szempont = 0;
    this._cikkservice.minta = this.bizonylatservice.TetelDtoEdited.MEGNEVEZES || '';
    this._cikkservice.zoomsource = ZoomSources.Bizonylattetel;
    this._cikkservice.zoom = true;
    this._cikkservice.ContainerMode = CikkContainerMode.List;

    this.bizonylatservice.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.CikkZoom;
  }
  MeZoom() {
    this._meservice.ekDto.minta = this.bizonylatservice.TetelDtoEdited.ME || '';
    this._meservice.zoomsource = ZoomSources.Bizonylattetel;
    this._meservice.zoom = true;
    this._meservice.ContainerMode = MeContainerMode.List;

    this.bizonylatservice.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.MeZoom;
  }
  AfaZoom() {
    this._afakulcsservice.ekDto.minta = this.bizonylatservice.TetelDtoEdited.AFAKULCS || '';
    this._afakulcsservice.zoomsource = ZoomSources.Bizonylattetel;
    this._afakulcsservice.zoom = true;
    this._afakulcsservice.ContainerMode = AfakulcsContainerMode.List;

    this.bizonylatservice.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.AfakulcsZoom;
  }
  TermekdijZoom() {
    this._termekdijservice.ekDto.minta = this.bizonylatservice.TetelDtoEdited.TERMEKDIJKT || '';
    this._termekdijservice.zoomsource = ZoomSources.Bizonylattetel;
    this._termekdijservice.zoom = true;
    this._termekdijservice.ContainerMode = TermekdijContainerMode.List;

    this.bizonylatservice.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.TermekdijZoom;
  }
  TermekdijTorles() {
    this.bizonylatservice.TetelDtoEdited.TERMEKDIJKOD = null;
    this.bizonylatservice.TetelDtoEdited.TERMEKDIJKT = null;
    this.bizonylatservice.TetelDtoEdited.TERMEKDIJMEGNEVEZES = null;
    this.bizonylatservice.TetelDtoEdited.TERMEKDIJEGYSEGAR = null;
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
        this.errormodal.show(err);
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
        this.errormodal.show(err);
      });
  }

  onSubmit() {
    this.eppFrissit = true;
    this._cikkservice.ZoomCheck(new CikkZoomParameter(this.bizonylatservice.TetelDtoEdited.CIKKKOD || 0,
            this.bizonylatservice.TetelDtoEdited.MEGNEVEZES || ''))
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        return this._meservice.ZoomCheck(new MeZoomParameter(this.bizonylatservice.TetelDtoEdited.MEKOD || 0,
          this.bizonylatservice.TetelDtoEdited.ME || ''));
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        return this._afakulcsservice.ZoomCheck(new AfakulcsZoomParameter(this.bizonylatservice.TetelDtoEdited.AFAKULCSKOD || 0,
          this.bizonylatservice.TetelDtoEdited.AFAKULCS || ''));
      })
      .then(res3 => {
        if (res3.Error != null) {
          throw res3.Error;
        }

        if ((this.bizonylatservice.TetelDtoEdited.TERMEKDIJKT || '') !== '') {
          return this._termekdijservice.ZoomCheck(new TermekdijZoomParameter(this.bizonylatservice.TetelDtoEdited.TERMEKDIJKOD || 0,
            this.bizonylatservice.TetelDtoEdited.TERMEKDIJKT || ''));
        } else {
          this.bizonylatservice.TetelDtoEdited.TERMEKDIJKOD = undefined;
          this.bizonylatservice.TetelDtoEdited.TERMEKDIJKT = undefined;
          this.bizonylatservice.TetelDtoEdited.TERMEKDIJMEGNEVEZES = undefined;
          this.bizonylatservice.TetelDtoEdited.TERMEKDIJEGYSEGAR = undefined;
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
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  cancel() {
    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.List;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

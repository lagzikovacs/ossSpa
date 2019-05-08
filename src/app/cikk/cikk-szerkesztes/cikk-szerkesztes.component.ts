import {Component, OnDestroy, ViewChild} from '@angular/core';
import {CikkService} from '../cikk.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {MeService} from '../../me/me.service';
import {AfakulcsService} from '../../afakulcs/afakulcs.service';
import {TermekdijService} from '../../termekdij/termekdij.service';
import {ZoomSources} from '../../enums/zoomsources';
import {MeZoomParameter} from '../../me/mezoomparameter';
import {AfakulcsZoomParameter} from '../../afakulcs/afakulcszoomparameter';
import {EmptyResult} from '../../dtos/emptyresult';
import {TermekdijZoomParameter} from '../../termekdij/termekdijzoomparameter';
import {CikkContainerMode} from '../cikkcontainermode';
import {CikkEgyMode} from '../cikkegymode';
import {MeContainerMode} from '../../me/mecontainermode';
import {AfakulcsContainerMode} from '../../afakulcs/afakulcscontainermode';
import {CikkSzerkesztesMode} from '../cikkszerkesztesmode';
import {TermekdijContainerMode} from '../../termekdij/termekdijcontainermode';

@Component({
  selector: 'app-cikk-szerkesztes',
  templateUrl: './cikk-szerkesztes.component.html',
  styleUrls: ['./cikk-szerkesztes.component.css']
})
export class CikkSzerkesztesComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  cikkservice: CikkService;
  eppFrissit = false;

  constructor(cikkservice: CikkService,
              private _meservice: MeService,
              private _afakulcsservice: AfakulcsService,
              private _termekdijservice: TermekdijService) {
    this.cikkservice = cikkservice;
  }

  onSubmit() {
    this._meservice.ZoomCheck(new MeZoomParameter(this.cikkservice.DtoEdited.Mekod || 0,
      this.cikkservice.DtoEdited.Me || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }
        return this._afakulcsservice.ZoomCheck(new AfakulcsZoomParameter(this.cikkservice.DtoEdited.Afakulcskod || 0,
          this.cikkservice.DtoEdited.Afakulcs || ''));
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        if ((this.cikkservice.DtoEdited.Termekdijkt || '') !== '') {
          return this._termekdijservice.ZoomCheck(new TermekdijZoomParameter(this.cikkservice.DtoEdited.Termekdijkod || 0,
            this.cikkservice.DtoEdited.Termekdijkt || ''));
        } else {
          this.cikkservice.DtoEdited.Termekdijkod = undefined;
          this.cikkservice.DtoEdited.Termekdijkt = undefined;
          this.cikkservice.DtoEdited.Termekdijmegnevezes = undefined;
          this.cikkservice.DtoEdited.Termekdijegysegar = undefined;
          return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
        }
      })
      .then(res2 => {
        if (res2.Error !== null) {
          throw res2.Error;
        }
        // itt a zoom már le van ellenőrizve
        if (this.cikkservice.uj) {
          return this.cikkservice.Add(this.cikkservice.DtoEdited);
        } else {
          return this.cikkservice.Update(this.cikkservice.DtoEdited);
        }
      })
      .then(res3 => {
        if (res3.Error !== null) {
          throw res3.Error;
        }
        return this.cikkservice.Get(res3.Result);
      })
      .then(res4 => {
        if (res4.Error !== null) {
          throw res4.Error;
        }
        if (this.cikkservice.uj) {
          this.cikkservice.Dto.unshift(res4.Result[0]);
        } else {
          this.cikkservice.Dto[this.cikkservice.DtoSelectedIndex] = res4.Result[0];
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
    if (this.cikkservice.uj) {
      this.cikkservice.ContainerMode = CikkContainerMode.List;
    } else {
      this.cikkservice.EgyMode = CikkEgyMode.Reszletek;
    }
  }

  MeZoom() {
    this._meservice.ekDto.minta = this.cikkservice.DtoEdited.Me || '';
    this._meservice.zoomsource = ZoomSources.Cikk;
    this._meservice.zoom = true;
    this._meservice.ContainerMode = MeContainerMode.List;

    this.cikkservice.SzerkesztesMode = CikkSzerkesztesMode.MeZoom;
  }
  AfakulcsZoom() {
    this._afakulcsservice.ekDto.minta = this.cikkservice.DtoEdited.Afakulcs || '';
    this._afakulcsservice.zoomsource = ZoomSources.Cikk;
    this._afakulcsservice.zoom = true;
    this._afakulcsservice.ContainerMode = AfakulcsContainerMode.List;

    this.cikkservice.SzerkesztesMode = CikkSzerkesztesMode.AfakulcsZoom;
  }
  TermekdijZoom() {
    this._termekdijservice.ekDto.minta = this.cikkservice.DtoEdited.Termekdijkt || '';
    this._termekdijservice.zoomsource = ZoomSources.Cikk;
    this._termekdijservice.zoom = true;
    this._termekdijservice.ContainerMode = TermekdijContainerMode.List;

    this.cikkservice.SzerkesztesMode = CikkSzerkesztesMode.TermekdijZoom;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

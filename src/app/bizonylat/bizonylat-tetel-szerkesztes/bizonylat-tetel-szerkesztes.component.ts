import { Component } from '@angular/core';
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

@Component({
  selector: 'app-bizonylat-tetel-szerkesztes',
  templateUrl: './bizonylat-tetel-szerkesztes.component.html',
  styleUrls: ['./bizonylat-tetel-szerkesztes.component.css']
})
export class BizonylatTetelSzerkesztesComponent {
  bizonylatservice: BizonylatService;
  eppFrissit = false;

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

  Br() {
    if (this.bizonylatservice.TetelDtoEdited.MENNYISEG)
    this.tetelcalc(null);
  }

  tetelcalc(e: any) {
    console.log('most');
  }

  onSubmit() {
    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.List;
  }
  cancel() {
    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.List;
  }
}

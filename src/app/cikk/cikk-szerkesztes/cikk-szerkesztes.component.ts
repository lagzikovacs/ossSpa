import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CikkService} from '../cikk.service';
import {MeService} from '../../primitiv/me/me.service';
import {AfakulcsService} from '../../primitiv/afakulcs/afakulcs.service';
import {TermekdijService} from '../../primitiv/termekdij/termekdij.service';
import {ZoomSources} from '../../enums/zoomsources';
import {MeZoomParameter} from '../../primitiv/me/mezoomparameter';
import {AfakulcsZoomParameter} from '../../primitiv/afakulcs/afakulcszoomparameter';
import {EmptyResult} from '../../dtos/emptyresult';
import {TermekdijZoomParameter} from '../../primitiv/termekdij/termekdijzoomparameter';
import {CikkSzerkesztesMode} from '../cikkszerkesztesmode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {deepCopy} from '../../tools/deepCopy';

@Component({
  selector: 'app-cikk-szerkesztes',
  templateUrl: './cikk-szerkesztes.component.html'
})
export class CikkSzerkesztesComponent implements OnInit, OnDestroy {
  cikkservice: CikkService;

  @Input() uj = false;
  @Output() eventSzerkeszteskesz = new EventEmitter<void>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(cikkservice: CikkService,
              private _meservice: MeService,
              private _afakulcsservice: AfakulcsService,
              private _termekdijservice: TermekdijService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService) {
    this.cikkservice = cikkservice;
  }

  ngOnInit() {
    this.cikkservice.SzerkesztesMode = CikkSzerkesztesMode.Blank;

    if (this.uj) {
      this.eppFrissit = true;
      this.cikkservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.cikkservice.DtoEdited = res.Result[0];
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.cikkservice.DtoEdited = deepCopy(this.cikkservice.Dto[this.cikkservice.DtoSelectedIndex]);
    }
  }

  onSubmit() {
    this.eppFrissit = true;

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
        if (this.uj) {
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
        if (this.uj) {
          this.cikkservice.Dto.unshift(res4.Result[0]);
        } else {
          this.cikkservice.Dto[this.cikkservice.DtoSelectedIndex] = res4.Result[0];
        }

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onCancel() {
    this.eventSzerkeszteskesz.emit();
  }

  MeZoom() {
    this._meservice.ekDto.minta = this.cikkservice.DtoEdited.Me || '';
    this._meservice.zoomsource = ZoomSources.Cikk;
    this._meservice.zoom = true;

    this.cikkservice.SzerkesztesMode = CikkSzerkesztesMode.MeZoom;
  }
  AfakulcsZoom() {
    this._afakulcsservice.ekDto.minta = this.cikkservice.DtoEdited.Afakulcs || '';
    this._afakulcsservice.zoomsource = ZoomSources.Cikk;
    this._afakulcsservice.zoom = true;

    this.cikkservice.SzerkesztesMode = CikkSzerkesztesMode.AfakulcsZoom;
  }
  TermekdijZoom() {
    this._termekdijservice.ekDto.minta = this.cikkservice.DtoEdited.Termekdijkt || '';
    this._termekdijservice.zoomsource = ZoomSources.Cikk;
    this._termekdijservice.zoom = true;

    this.cikkservice.SzerkesztesMode = CikkSzerkesztesMode.TermekdijZoom;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

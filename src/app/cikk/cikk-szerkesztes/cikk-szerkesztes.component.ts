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
import {propCopy} from '../../tools/propCopy';
import {AfakulcsDto} from '../../primitiv/afakulcs/afakulcsdto';
import {MeDto} from '../../primitiv/me/medto';
import {TermekdijDto} from '../../primitiv/termekdij/termekdijdto';
import {CikkDto} from '../cikkdto';

@Component({
  selector: 'app-cikk-szerkesztes',
  templateUrl: './cikk-szerkesztes.component.html'
})
export class CikkSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new CikkDto();
  @Input() set DtoOriginal(value: CikkDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<CikkDto>();

  SzerkesztesMode = CikkSzerkesztesMode.Blank;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  cikkservice: CikkService;

  constructor(private _meservice: MeService,
              private _afakulcsservice: AfakulcsService,
              private _termekdijservice: TermekdijService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              cikkservice: CikkService) {
    this.cikkservice = cikkservice;
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.cikkservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.DtoEdited = res.Result[0];
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    }
  }

  onSubmit() {
    this.eppFrissit = true;

    this._meservice.ZoomCheck(new MeZoomParameter(this.DtoEdited.Mekod || 0,
      this.DtoEdited.Me || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }
        return this._afakulcsservice.ZoomCheck(new AfakulcsZoomParameter(this.DtoEdited.Afakulcskod || 0,
          this.DtoEdited.Afakulcs || ''));
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        if ((this.DtoEdited.Termekdijkt || '') !== '') {
          return this._termekdijservice.ZoomCheck(new TermekdijZoomParameter(this.DtoEdited.Termekdijkod || 0,
            this.DtoEdited.Termekdijkt || ''));
        } else {
          this.DtoEdited.Termekdijkod = undefined;
          this.DtoEdited.Termekdijkt = undefined;
          this.DtoEdited.Termekdijmegnevezes = undefined;
          this.DtoEdited.Termekdijegysegar = undefined;
          return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
        }
      })
      .then(res2 => {
        if (res2.Error !== null) {
          throw res2.Error;
        }

        // itt a zoom már le van ellenőrizve
        if (this.uj) {
          return this.cikkservice.Add(this.DtoEdited);
        } else {
          return this.cikkservice.Update(this.DtoEdited);
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

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res4.Result[0]);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onCancel() {
    this.eventSzerkeszteskesz.emit(null);
  }

  MeZoom() {
    this.SzerkesztesMode = CikkSzerkesztesMode.MeZoom;
  }
  onMeSelectzoom(Dto: MeDto) {
    this.DtoEdited.Mekod = Dto.Mekod;
    this.DtoEdited.Me = Dto.Me;
  }
  onMeStopzoom() {
    this.SzerkesztesMode = CikkSzerkesztesMode.Blank;
  }

  AfakulcsZoom() {
    this.SzerkesztesMode = CikkSzerkesztesMode.AfakulcsZoom;
  }
  onAfakulcsSelectzoom(Dto: AfakulcsDto) {
    this.DtoEdited.Afakulcskod = Dto.Afakulcskod;
    this.DtoEdited.Afakulcs = Dto.Afakulcs1;
    this.DtoEdited.Afamerteke = Dto.Afamerteke;
  }
  onAfakulcsStopzoom() {
    this.SzerkesztesMode = CikkSzerkesztesMode.Blank;
  }

  TermekdijZoom() {
    this.SzerkesztesMode = CikkSzerkesztesMode.TermekdijZoom;
  }
  onTermekdijSelectzoom(Dto: TermekdijDto) {
    this.DtoEdited.Termekdijkod = Dto.Termekdijkod;
    this.DtoEdited.Termekdijkt = Dto.Termekdijkt;
    this.DtoEdited.Termekdijmegnevezes = Dto.Termekdijmegnevezes;
    this.DtoEdited.Termekdijegysegar = Dto.Termekdijegysegar;
  }
  onTermekdijStopzoom() {
    this.SzerkesztesMode = CikkSzerkesztesMode.Blank;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

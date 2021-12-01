import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {CikkService} from '../../cikk/cikk.service';
import {MeService} from '../../primitiv/me/me.service';
import {AfakulcsService} from '../../primitiv/afakulcs/afakulcs.service';
import {TermekdijService} from '../../primitiv/termekdij/termekdij.service';
import {BizonylattetelSzerkesztesMode} from '../bizonylattetelszerkesztesmode';
import {BruttobolParam} from '../bruttobolparam';
import {CikkZoomParameter} from '../../cikk/cikkzoomparameter';
import {EmptyResult} from '../../dtos/emptyresult';
import {TermekdijZoomParameter} from '../../primitiv/termekdij/termekdijzoomparameter';
import {AfakulcsZoomParameter} from '../../primitiv/afakulcs/afakulcszoomparameter';
import {MeZoomParameter} from '../../primitiv/me/mezoomparameter';
import {ErrorService} from '../../tools/errorbox/error.service';
import {AfakulcsDto} from '../../primitiv/afakulcs/afakulcsdto';
import {MeDto} from '../../primitiv/me/medto';
import {TermekdijDto} from '../../primitiv/termekdij/termekdijdto';
import {CikkDto} from '../../cikk/cikkdto';
import {BizonylatTipusLeiro} from '../bizonylattipusleiro';
import {BizonylatTetelDto} from '../bizonylatteteldto';

@Component({
  selector: 'app-bizonylattetel-szerkesztes',
  templateUrl: './bizonylattetel-szerkesztes.component.html'
})
export class BizonylattetelSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() bizonylatLeiro = new BizonylatTipusLeiro();
  @Input() teteluj = false;
  @Input() szvesz = false;
  @Input() TetelDtoEdited = new BizonylatTetelDto();
  @Output() eventUjModositasUtan = new EventEmitter<BizonylatTetelDto>();

  TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;

  bruttoosszeg = 0;

  eppFrissit = false;

  bizonylattetelzoombox: any;

  bizonylatservice: BizonylatService;

  constructor(private _cikkservice: CikkService,
              private _meservice: MeService,
              private _afakulcsservice: AfakulcsService,
              private _termekdijservice: TermekdijService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  ngOnInit() {
    this.bizonylattetelzoombox = document.getElementById('bizonylattetelzoombox');
  }

  CikkZoom() {
    this.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.CikkZoom;
    this.bizonylattetelzoombox.style.display = 'block';
    this._cdr.detectChanges();
  }
  onCikkSelectzoom(Dto: CikkDto) {
    this.TetelDtoEdited.Cikkkod = Dto.Cikkkod;
    this.TetelDtoEdited.Megnevezes = Dto.Megnevezes;
    this.TetelDtoEdited.Mekod = Dto.Mekod;
    this.TetelDtoEdited.Me = Dto.Me;
    this.TetelDtoEdited.Afakulcskod = Dto.Afakulcskod;
    this.TetelDtoEdited.Afakulcs = Dto.Afakulcs;
    this.TetelDtoEdited.Afamerteke = Dto.Afamerteke;
    this.TetelDtoEdited.Egysegar = Dto.Egysegar;
    this.TetelDtoEdited.Tomegkg = Dto.Tomegkg;

    this.TetelDtoEdited.Termekdijkod = Dto.Termekdijkod;
    this.TetelDtoEdited.Termekdijkt = Dto.Termekdijkt;
    this.TetelDtoEdited.Termekdijmegnevezes = Dto.Termekdijmegnevezes;
    this.TetelDtoEdited.Termekdijegysegar = Dto.Termekdijegysegar;
    this.bizonylattetelzoombox.style.display = 'none';
    this._cdr.detectChanges();
  }
  onCikkStopzoom() {
    this.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;
    this.bizonylattetelzoombox.style.display = 'none';
    this._cdr.detectChanges();
  }

  MeZoom() {
    this.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.MeZoom;
    this.bizonylattetelzoombox.style.display = 'block';
    this._cdr.detectChanges();
  }
  onMeSelectzoom(Dto: MeDto) {
    this.TetelDtoEdited.Mekod = Dto.Mekod;
    this.TetelDtoEdited.Me = Dto.Me;
    this.bizonylattetelzoombox.style.display = 'none';
    this._cdr.detectChanges();
  }
  onMeStopzoom() {
    this.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;
    this.bizonylattetelzoombox.style.display = 'none';
    this._cdr.detectChanges();
  }

  AfakulcsZoom() {
    this.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.AfakulcsZoom;
    this.bizonylattetelzoombox.style.display = 'block';
    this._cdr.detectChanges();
  }
  onAfakulcsSelectzoom(Dto: AfakulcsDto) {
    this.TetelDtoEdited.Afakulcskod = Dto.Afakulcskod;
    this.TetelDtoEdited.Afakulcs = Dto.Afakulcs1;
    this.TetelDtoEdited.Afamerteke = Dto.Afamerteke;
    this.bizonylattetelzoombox.style.display = 'none';
    this._cdr.detectChanges();
  }
  onAfakulcsStopzoom() {
    this.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;
    this.bizonylattetelzoombox.style.display = 'none';
    this._cdr.detectChanges();
  }

  TermekdijZoom() {
    this.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.TermekdijZoom;
    this.bizonylattetelzoombox.style.display = 'block';
    this._cdr.detectChanges();
  }
  onTermekdijSelectzoom(Dto: TermekdijDto) {
    this.TetelDtoEdited.Termekdijkod = Dto.Termekdijkod;
    this.TetelDtoEdited.Termekdijkt = Dto.Termekdijkt;
    this.TetelDtoEdited.Termekdijmegnevezes = Dto.Termekdijmegnevezes;
    this.TetelDtoEdited.Termekdijegysegar = Dto.Termekdijegysegar;
    this.bizonylattetelzoombox.style.display = 'none';
    this._cdr.detectChanges();
  }
  onTermekdijStopzoom() {
    this.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;
    this.bizonylattetelzoombox.style.display = 'none';
    this._cdr.detectChanges();
  }
  TermekdijTorles() {
    this.TetelDtoEdited.Termekdijkod = null;
    this.TetelDtoEdited.Termekdijkt = null;
    this.TetelDtoEdited.Termekdijmegnevezes = null;
    this.TetelDtoEdited.Termekdijegysegar = null;
    this._cdr.detectChanges();
  }

  bruttobol() {
    this.eppFrissit = true;
    this.bizonylatservice.Bruttobol(new BruttobolParam(this.TetelDtoEdited, this.bruttoosszeg))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.TetelDtoEdited = res.Result[0];
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  tetelcalc(e: any) {
    this.eppFrissit = true;
    this.bizonylatservice.BizonylattetelCalc(this.TetelDtoEdited)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.TetelDtoEdited = res.Result[0];
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onSubmit() {
    this.eppFrissit = true;
    this._cikkservice.ZoomCheck(new CikkZoomParameter(this.TetelDtoEdited.Cikkkod || 0,
            this.TetelDtoEdited.Megnevezes || ''))
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        return this._meservice.ZoomCheck(new MeZoomParameter(this.TetelDtoEdited.Mekod || 0,
          this.TetelDtoEdited.Me || ''));
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        return this._afakulcsservice.ZoomCheck(new AfakulcsZoomParameter(this.TetelDtoEdited.Afakulcskod || 0,
          this.TetelDtoEdited.Afakulcs || ''));
      })
      .then(res3 => {
        if (res3.Error != null) {
          throw res3.Error;
        }

        if ((this.TetelDtoEdited.Termekdijkt || '') !== '') {
          return this._termekdijservice.ZoomCheck(new TermekdijZoomParameter(this.TetelDtoEdited.Termekdijkod || 0,
            this.TetelDtoEdited.Termekdijkt || ''));
        } else {
          this.TetelDtoEdited.Termekdijkod = undefined;
          this.TetelDtoEdited.Termekdijkt = undefined;
          this.TetelDtoEdited.Termekdijmegnevezes = undefined;
          this.TetelDtoEdited.Termekdijegysegar = undefined;
          return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
        }
      })
      .then(res4 => {
        if (res4.Error != null) {
          throw res4.Error;
        }

        return this.bizonylatservice.BizonylattetelCalc(this.TetelDtoEdited);
      })
      .then(res5 => {
        if (res5.Error != null) {
          throw res5.Error;
        }

        this._cdr.detectChanges();
        this.eppFrissit = false;
        this.eventUjModositasUtan.emit(res5.Result[0]);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  cancel() {
    this._cdr.detectChanges();
    this.eventUjModositasUtan.emit(null);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

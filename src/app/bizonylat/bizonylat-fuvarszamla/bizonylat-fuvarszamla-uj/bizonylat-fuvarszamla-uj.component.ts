import {Component, OnDestroy, Output, EventEmitter, Input, OnInit} from '@angular/core';
import {BizonylatService} from '../../bizonylat.service';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {BizonylatDto} from '../../bizonylatdto';
import {BizonylatZoomParameter} from '../../bizonylatzoomparameter';
import {FuvardijParam} from '../../fuvardijparam';

@Component({
  selector: 'app-bizonylat-fuvarszamla-uj',
  templateUrl: './bizonylat-fuvarszamla-uj.component.html'
})
export class BizonylatFuvarszamlaUjComponent implements OnInit, OnDestroy {
  @Input() dtoAnyagszamla: BizonylatDto;
  dtoFuvarszamla = new BizonylatDto();
  @Output() eventMegsem = new EventEmitter();
  @Output() eventOK = new EventEmitter<BizonylatDto>();
  eppFrissit = false;
  bizonylatservice: BizonylatService;

  Fuvardij: number;

  SzerkesztesMode = 0;

  fuvarszamlazoombox: any;

  constructor(private _errorservice: ErrorService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  ngOnInit() {
    this.fuvarszamlazoombox = document.getElementById('fuvarszamlazoombox');
  }

  BizonylatZoom() {
    this.SzerkesztesMode = 1;
    this.fuvarszamlazoombox.style.display = 'block';
  }

  eventStopZoom() {
    this.SzerkesztesMode = 0;
    this.fuvarszamlazoombox.style.display = 'none';
  }

  eventSelectzoom(Dto: BizonylatDto) {
    this.dtoFuvarszamla = Dto;
    this.Fuvardij = Dto.Netto;

    this.SzerkesztesMode = 0;
    this.fuvarszamlazoombox.style.display = 'none';
  }

  onSubmit() {
    this.eppFrissit = true;
    this.bizonylatservice.ZoomCheck(new BizonylatZoomParameter(this.dtoFuvarszamla.Bizonylatkod || 0,
      this.dtoFuvarszamla.Bizonylatszam || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        return this.bizonylatservice.Fuvardij(new FuvardijParam(this.dtoAnyagszamla, this.dtoFuvarszamla, this.Fuvardij));
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        return this.bizonylatservice.Get(res1.Result);
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        this.eppFrissit = false;
        this.eventOK.emit(res2.Result[0]);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  doCancel() {
    this.eventMegsem.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

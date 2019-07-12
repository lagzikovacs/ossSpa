import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {BizonylatComplexDto} from '../bizonylatcomplexdto';
import {BizonylatDto} from '../bizonylatdto';
import {BizonylatTetelDto} from '../bizonylatteteldto';
import {BizonylatAfaDto} from '../bizonylatafadto';
import {BizonylatTermekdijDto} from '../bizonylattermekdijdto';
import {BizonylatTipusLeiro} from '../bizonylattipusleiro';

@Component({
  selector: 'app-bizonylat-reszletek',
  templateUrl: './bizonylat-reszletek.component.html'
})
export class BizonylatReszletekComponent implements OnInit, OnDestroy {
  @Input() Bizonylatkod = -1;
  @Input() bizonylatLeiro = new BizonylatTipusLeiro();

  cdto = new BizonylatComplexDto();
  cdtoDto = new Array<BizonylatDto>();
  cdtoTetel = new Array<BizonylatTetelDto>();
  cdtoAfa = new Array<BizonylatAfaDto>();
  cdtoTermekdij = new Array<BizonylatTermekdijDto>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  bizonylatservice: BizonylatService;

  constructor(private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  ngOnInit() {
    this.eppFrissit = true;
    this.bizonylatservice.GetComplex(this.Bizonylatkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.cdto = res.Result[0];

        this.cdtoDto.unshift(this.cdto.Dto); // a tábla komponens tömböt vár
        this.cdtoTetel = this.cdto.LstTetelDto;
        this.cdtoAfa = this.cdto.LstAfaDto;
        this.cdtoTermekdij = this.cdto.LstTermekdijDto;

        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

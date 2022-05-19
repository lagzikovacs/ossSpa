import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {BizonylatComplexDto} from '../bizonylatcomplexdto';
import {BizonylatDto} from '../bizonylatdto';
import {BizonylatTetelDto} from '../../bizonylattetel/bizonylatteteldto';
import {BizonylatAfaDto} from '../bizonylatafadto';
import {BizonylatTermekdijDto} from '../bizonylattermekdijdto';
import {BizonylatTipusLeiro} from '../bizonylattipusleiro';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylat-reszletek',
  templateUrl: './bizonylat-reszletek.component.html'
})
export class BizonylatReszletekComponent implements OnInit, OnDestroy {
  @Input() Bizonylatkod = -1;
  @Input() bizonylatLeiro = new BizonylatTipusLeiro();

  cdto = new BizonylatComplexDto();

  cdtoFej = new Array<BizonylatDto>();
  cdtoTetel = new Array<BizonylatTetelDto>();
  cdtoAfa = new Array<BizonylatAfaDto>();
  cdtoTermekdij = new Array<BizonylatTermekdijDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  bizonylatservice: BizonylatService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  async ngOnInit() {
    this.spinner = true;
    try {
      const res = await this.bizonylatservice.GetComplex(this.Bizonylatkod);
      if (res.Error != null) {
        throw res.Error;
      }

      this.cdto = res.Result[0];

      const f = new Array<BizonylatDto>();
      f.push(this.cdto.Dto); // a tábla komponens tömböt vár

      this.cdtoFej = f;
      this.cdtoTetel = this.cdto.LstTetelDto;
      this.cdtoAfa = this.cdto.LstAfaDto;
      this.cdtoTermekdij = this.cdto.LstTermekdijDto;

      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
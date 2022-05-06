import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BizonylatService} from '../../03 Bizonylatok/bizonylat/bizonylat.service';
import {ErrorService} from '../../common/errorbox/error.service';
import {BizonylatComplexDto} from '../../03 Bizonylatok/bizonylat/bizonylatcomplexdto';
import {BizonylatDto} from '../../03 Bizonylatok/bizonylat/bizonylatdto';
import {BizonylatTetelDto} from '../../03 Bizonylatok/bizonylattetel/bizonylatteteldto';
import {BizonylatAfaDto} from '../../03 Bizonylatok/bizonylat/bizonylatafadto';
import {BizonylatTermekdijDto} from '../../03 Bizonylatok/bizonylat/bizonylattermekdijdto';
import {BizonylatTipusLeiro} from '../../03 Bizonylatok/bizonylat/bizonylattipusleiro';

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

  eppFrissit = false;

  bizonylatservice: BizonylatService;

  constructor(private _errorservice: ErrorService,
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

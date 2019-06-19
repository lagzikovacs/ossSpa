import {Component, OnDestroy, OnInit} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {BizonylattetelSzerkesztesMode} from '../bizonylattetelszerkesztesmode';
import {BizonylatSzerkesztesMode} from '../bizonylatszerkesztesmode';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-bizonylat-tetel-torles',
  templateUrl: './bizonylat-tetel-torles.component.html'
})
export class BizonylatTetelTorlesComponent implements OnInit, OnDestroy {

  bizonylatservice: BizonylatService;
  eppFrissit = false;
  megnevezes = '';

  constructor(bizonylatservice: BizonylatService,
              private _errorservice: ErrorService) {
    this.bizonylatservice = bizonylatservice;
  }

  ngOnInit() {
    this.megnevezes = this.bizonylatservice.ComplexDtoEdited.LstTetelDto[this.bizonylatservice.TetelDtoSelectedIndex].Megnevezes;
  }

  ok() {
    this.eppFrissit = true;
    this.bizonylatservice.ComplexDtoEdited.LstTetelDto.splice(this.bizonylatservice.TetelDtoSelectedIndex, 1);
    this.bizonylatservice.SumEsAfaEsTermekdij(this.bizonylatservice.ComplexDtoEdited)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatservice.ComplexDtoEdited = res.Result[0];

        this.eppFrissit = false;
        this.navigal();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.List;
    this.bizonylatservice.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

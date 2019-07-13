import {Component, OnDestroy, OnInit} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {BizonylattetelSzerkesztesMode} from '../bizonylattetelszerkesztesmode';
import {BizonylatSzerkesztesMode} from '../bizonylatszerkesztesmode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-bizonylattetel-torles',
  templateUrl: './bizonylattetel-torles.component.html'
})
export class BizonylattetelTorlesComponent implements OnInit, OnDestroy {
  bizonylatservice: BizonylatService;
  megnevezes = '';

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  ngOnInit() {
    // this.megnevezes = this.bizonylatservice.ComplexDtoEdited.LstTetelDto[this.bizonylatservice.TetelDtoSelectedIndex].Megnevezes;
  }

  ok() {
    // this.eppFrissit = true;
    // this.bizonylatservice.ComplexDtoEdited.LstTetelDto.splice(this.bizonylatservice.TetelDtoSelectedIndex, 1);
    // this.bizonylatservice.SumEsAfaEsTermekdij(this.bizonylatservice.ComplexDtoEdited)
    //   .then(res => {
    //     if (res.Error != null) {
    //       throw res.Error;
    //     }
    //
    //     this.bizonylatservice.ComplexDtoEdited = res.Result[0];
    //
    //     this.eppFrissit = false;
    //     this.navigal();
    //   })
    //   .catch(err => {
    //     this.eppFrissit = false;
    //     this._errorservice.Error = err;
    //   });
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    // this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.List;
    // this.bizonylatservice.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

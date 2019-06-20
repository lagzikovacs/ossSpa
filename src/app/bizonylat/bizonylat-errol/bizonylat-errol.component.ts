import {Component, OnDestroy} from '@angular/core';
import {BizonylatTipus} from '../bizonylattipus';
import {BizonylatService} from '../bizonylat.service';
import {BizonylatEgyMode} from '../bizonylategymode';
import {BizonylatMintaAlapjanParam} from '../bizonylatmintaalapjan';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-bizonylat-errol',
  templateUrl: './bizonylat-errol.component.html'
})
export class BizonylatErrolComponent implements OnDestroy {
  entries = [
    ['Díjbekérő', BizonylatTipus.DijBekero],
    ['Előlegszámla', BizonylatTipus.ElolegSzamla],
    ['Megrendelés', BizonylatTipus.Megrendeles],
    ['Szállító', BizonylatTipus.Szallito],
    ['Számla', BizonylatTipus.Szamla],
    ['Bejövő számla', BizonylatTipus.BejovoSzamla]
  ];
  entryindex = 4;
  kesz = false;
  ujbizonylatkod = 0;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _bizonylatservice: BizonylatService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService) {
  }

  change(i) {
    this.entryindex = i;
  }
  onSubmit() {
    if (!this.kesz) {
      this.eppFrissit = true;
      this._bizonylatservice.UjBizonylatMintaAlapjan(new BizonylatMintaAlapjanParam(
        this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].Bizonylatkod,
        this.entries[this.entryindex][1]))
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.ujbizonylatkod = res.Result;

          this.kesz = true;
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.navigal();
    }
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    this._bizonylatservice.EgyMode = BizonylatEgyMode.Blank;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

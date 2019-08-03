import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {BizonylatTipus} from '../bizonylattipus';
import {BizonylatService} from '../bizonylat.service';
import {BizonylatMintaAlapjanParam} from '../bizonylatmintaalapjan';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-bizonylat-errol',
  templateUrl: './bizonylat-errol.component.html'
})
export class BizonylatErrolComponent implements OnDestroy {
  @Input() Bizonylatkod = -1;
  @Output() eventBizonylaterrolUtan = new EventEmitter<boolean>();

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

  eppFrissit = false;

  constructor(private _bizonylatservice: BizonylatService,
              private _errorservice: ErrorService) {
  }

  change(i) {
    this.entryindex = i;
  }
  onSubmit() {
    if (!this.kesz) {
      this.eppFrissit = true;
      this._bizonylatservice.UjBizonylatMintaAlapjan(new BizonylatMintaAlapjanParam(
        this.Bizonylatkod, this.entries[this.entryindex][1]))
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
      this.eventBizonylaterrolUtan.emit(true);
    }
  }

  cancel() {
    this.eventBizonylaterrolUtan.emit(false);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

import {Component, OnDestroy, ViewChild} from '@angular/core';
import {BizonylatTipus} from '../bizonylattipus';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {BizonylatService} from '../bizonylat.service';
import {BizonylatEgyMode} from '../bizonylategymode';
import {BizonylatMintaAlapjanParam} from '../bizonylatmintaalapjan';

@Component({
  selector: 'app-bizonylat-errol',
  templateUrl: './bizonylat-errol.component.html'
})
export class BizonylatErrolComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  eppFrissit = false;
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

  constructor(private _bizonylatservice: BizonylatService) { }

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
          this.errormodal.show(err);
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

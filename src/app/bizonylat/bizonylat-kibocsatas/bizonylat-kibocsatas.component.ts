import {Component, OnDestroy, ViewChild} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {BizonylatEgyMode} from '../bizonylategymode';
import {BizonylatKibocsatasParam} from '../bizonylatkibocsatasparam';
import {BizonylatTipus} from '../bizonylattipus';
import {PenztarService} from '../../penztar/penztar.service';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-bizonylat-kibocsatas',
  templateUrl: './bizonylat-kibocsatas.component.html'
})
export class BizonylatKibocsatasComponent implements OnDestroy {
  bizonylatservice: BizonylatService;
  eppFrissit = false;
  bizonylatszam = '';

  constructor(private _penztarsevice: PenztarService,
              private _errorservice: ErrorService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    this.bizonylatservice.Kibocsatas(new BizonylatKibocsatasParam(this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex],
      this.bizonylatszam))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.bizonylatservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex] = res1.Result[0];

        if ((this.bizonylatservice.bizonylatTipus === BizonylatTipus.BejovoSzamla ||
            this.bizonylatservice.bizonylatTipus === BizonylatTipus.ElolegSzamla ||
            this.bizonylatservice.bizonylatTipus === BizonylatTipus.Szamla) &&
            this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Fizetesimod === 'Készpénz') {

            return this._penztarsevice.ReadByCurrencyOpened(this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Penznemkod);
        } else {
          this.bizonylatservice.EgyMode = BizonylatEgyMode.Reszletek;
        }
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        this.bizonylatservice.BizonylatPenztarDto = res2.Result;

        this.bizonylatservice.EgyMode = BizonylatEgyMode.Penztar;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  cancel() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Blank;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

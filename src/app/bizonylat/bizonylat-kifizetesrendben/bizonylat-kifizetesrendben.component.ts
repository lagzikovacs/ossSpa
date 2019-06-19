import {Component, OnDestroy} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-bizonylat-kifizetesrendben',
  templateUrl: './bizonylat-kifizetesrendben.component.html'
})
export class BizonylatKifizetesrendbenComponent implements OnDestroy {
  bizonylatservice: BizonylatService;
  eppFrissit = false;

  constructor(bizonylatservice: BizonylatService,
              private _errorservice: ErrorService) {
    this.bizonylatservice = bizonylatservice;
  }

  modositas() {
    this.eppFrissit = true;
    this.bizonylatservice.KifizetesRendben(this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex])
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

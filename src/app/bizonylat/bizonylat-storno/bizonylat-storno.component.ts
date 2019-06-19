import {Component, OnDestroy} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {BizonylatEgyMode} from '../bizonylategymode';
import {BizonylatContainerMode} from '../bizonylatcontainermode';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-bizonylat-storno',
  templateUrl: './bizonylat-storno.component.html'
})
export class BizonylatStornoComponent implements OnDestroy {
  bizonylatservice: BizonylatService;
  eppFrissit = false;

  constructor(bizonylatservice: BizonylatService,
              private _errorservice: ErrorService) {
    this.bizonylatservice = bizonylatservice;
  }

  ok() {
    const stornozandoKod = this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Bizonylatkod;
    let stornozoKod = 0;

    this.eppFrissit = true;
    this.bizonylatservice.Storno(this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        stornozoKod = res.Result;

        return this.bizonylatservice.Get(stornozandoKod);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex] = res1.Result[0];

        return this.bizonylatservice.Get(stornozoKod);
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        this.bizonylatservice.Dto.unshift(res2.Result[0]);

        this.eppFrissit = false;
        this.bizonylatservice.ContainerMode = BizonylatContainerMode.List;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  cancel() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-bizonylat-container',
  templateUrl: './bizonylat-container.component.html'
})
export class BizonylatContainerComponent implements OnInit, OnDestroy {
  bizonylatservice: BizonylatService;
  eppFrissit = false;

  constructor(bizonylatservice: BizonylatService,
              private _errorservice: ErrorService) {
    this.bizonylatservice = bizonylatservice;
  }

  ngOnInit() {
    this.eppFrissit = true;
    this.bizonylatservice.GetBizonylatLeiro()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
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

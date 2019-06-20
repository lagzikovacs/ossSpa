import {Component, OnDestroy, OnInit} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-bizonylat-container',
  templateUrl: './bizonylat-container.component.html'
})
export class BizonylatContainerComponent implements OnInit, OnDestroy {
  bizonylatservice: BizonylatService;

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

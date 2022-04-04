import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ErrorService} from '../../../common/errorbox/error.service';
import {BizonylatService} from '../../bizonylat.service';
import {BizonylatDto} from '../../bizonylatdto';

@Component({
  selector: 'app-bizonylat-fuvarszamla-torles',
  templateUrl: './bizonylat-fuvarszamla-torles.component.html'
})
export class BizonylatFuvarszamlaTorlesComponent implements OnDestroy {
  @Input() dtoAnyagszamla: BizonylatDto;
  @Output() eventMegsem = new EventEmitter();
  @Output() eventOK = new EventEmitter<BizonylatDto>();
  eppFrissit = false;
  bizonylatservice: BizonylatService;

  constructor(private _errorservice: ErrorService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  doOk() {
    this.eppFrissit = true;
    this.bizonylatservice.FuvardijTorles(this.dtoAnyagszamla)
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

        this.eppFrissit = false;
        this.eventOK.emit(res1.Result[0]);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  doCancel() {
    this.eventMegsem.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

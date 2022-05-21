import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy,
  Output
} from '@angular/core';
import {ErrorService} from '../../../common/errorbox/error.service';
import {BizonylatService} from '../../bizonylat/bizonylat.service';
import {BizonylatDto} from '../../bizonylat/bizonylatdto';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylat-fuvarszamla-torles',
  templateUrl: './bizonylat-fuvarszamla-torles.component.html'
})
export class BizonylatFuvarszamlaTorlesComponent implements OnDestroy {
  @Input() dtoAnyagszamla: BizonylatDto;
  @Output() eventMegsem = new EventEmitter();
  @Output() eventOK = new EventEmitter<BizonylatDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  bizonylatservice: BizonylatService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  async doOk() {
    this.spinner = true;
    try {
      const res = await this.bizonylatservice.FuvardijTorles(this.dtoAnyagszamla);
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this.bizonylatservice.Get(res.Result);
      if (res1.Error != null) {
        throw res1.Error;
      }

      this.spinner = false;
      this.eventOK.emit(res1.Result[0]);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
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

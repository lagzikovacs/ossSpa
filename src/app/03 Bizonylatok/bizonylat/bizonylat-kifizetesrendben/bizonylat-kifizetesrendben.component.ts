import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy,
  Output
} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {BizonylatDto} from '../bizonylatdto';
import {deepCopy} from '../../../common/deepCopy';
import {BizonylatTipusLeiro} from '../bizonylattipusleiro';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylat-kifizetesrendben',
  templateUrl: './bizonylat-kifizetesrendben.component.html'
})
export class BizonylatKifizetesrendbenComponent implements OnDestroy {
  Dto = new BizonylatDto();
  @Input() set DtoOriginal(value: BizonylatDto) {
    this.Dto = deepCopy(value);
  }
  @Input() bizonylatLeiro = new BizonylatTipusLeiro();
  @Output() eventKifizetesrendbenUtan = new EventEmitter<BizonylatDto>();

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

  async modositas() {
    this.spinner = true;
    try {
      const res = await this.bizonylatservice.KifizetesRendben(this.Dto);
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this.bizonylatservice.Get(res.Result);
      if (res1.Error != null) {
        throw res1.Error;
      }

      this.spinner = false;
      this.eventKifizetesrendbenUtan.emit(res1.Result[0]);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy,
  Output
} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {deepCopy} from '../../../common/deepCopy';
import {BizonylatDto} from '../bizonylatdto';
import {BizonylatTipusLeiro} from '../bizonylattipusleiro';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylat-storno',
  templateUrl: './bizonylat-storno.component.html'
})
export class BizonylatStornoComponent implements OnDestroy {
  Dto = new BizonylatDto();
  @Input() set DtoOriginal(value: BizonylatDto) {
    this.Dto = deepCopy(value);
  }
  @Input() bizonylatLeiro = new BizonylatTipusLeiro();
  @Output() eventStornozando = new EventEmitter<BizonylatDto>();
  @Output() eventStornozo = new EventEmitter<BizonylatDto>();
  @Output() eventStornoMegsem = new EventEmitter();

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

  async ok() {
    const stornozandoKod = this.Dto.Bizonylatkod;
    let stornozoKod = 0;

    this.spinner = true;
    try {
      const res = await this.bizonylatservice.Storno(this.Dto);
      if (res.Error != null) {
        throw res.Error;
      }

      stornozoKod = res.Result;
      const res1 = await this.bizonylatservice.Get(stornozandoKod);
      if (res1.Error != null) {
        throw res1.Error;
      }

      this.eventStornozando.emit(res1.Result[0]);
      
      const res2 = await this.bizonylatservice.Get(stornozoKod);
      if (res2.Error != null) {
        throw res2.Error;
      }

      this.spinner = false;
      this.eventStornozo.emit(res2.Result[0]);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  cancel() {
    this.eventStornoMegsem.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

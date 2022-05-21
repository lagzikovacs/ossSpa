import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy,
  Output
} from '@angular/core';
import {BizonylatkapcsolatService} from '../bizonylatkapcsolat.service';
import {BizonylatKapcsolatParam} from '../bizonylatkapcsolatparam';
import {VagolapService} from '../../../05 Segedeszkozok/08 Vagolap/vagolap.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {BizonylatKapcsolatDto} from '../bizonylatkapcsolatdto';
import {BizonylatKapcsolatResult} from '../bizonylatkapcsolatresult';
import {NumberResult} from '../../../common/dtos/numberresult';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylatkapcsolat-vagolaprol',
  templateUrl: './bizonylatkapcsolat-vagolaprol.component.html'
})
export class BizonylatkapcsolatVagolaprolComponent implements OnDestroy {
  @Input() Bizonylatkod = -1;
  @Output() eventVagolaprolutan = new EventEmitter<BizonylatKapcsolatDto>();
  @Output() eventVagolaprolutanvege = new EventEmitter<void>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  bizonylatkapcsolatservice: BizonylatkapcsolatService;

  constructor(private _vagolapservice: VagolapService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              bizonylatkapcsolatservice: BizonylatkapcsolatService) {
    this.bizonylatkapcsolatservice = bizonylatkapcsolatservice;
  }

  async ok() {
    if (this._vagolapservice.kijeloltekszama() === 0) {
      this._errorservice.Error = 'Nincs kijelölt tétel!';
      return;
    }

    for (let i = 0; i < this._vagolapservice.Dto.length; i++) {
      if (this._vagolapservice.Dto[i].selected) {
        if (this._vagolapservice.Dto[i].tipus === 0) {
          this.spinner = true;
          try {
            const res = await this.bizonylatkapcsolatservice.AddIratToBizonylat(new BizonylatKapcsolatParam(
              this.Bizonylatkod, this._vagolapservice.Dto[i].iratkod));
            if (res.Error != null) {
              throw res.Error;
            }

            const res1 = await this.bizonylatkapcsolatservice.Get(res.Result);
            if (res1.Error != null) {
              throw res1.Error;
            }

            this.eventVagolaprolutan.emit(res1.Result[0]);
            this.spinner = false;
          } catch (err) {
            this.spinner = false;
            this._errorservice.Error = err;
          }
        }
      }
    }

    this.eventVagolaprolutanvege.emit();
  }

  cancel() {
    this.eventVagolaprolutanvege.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

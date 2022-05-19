import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy,
  Output
} from '@angular/core';
import {BizonylatkapcsolatService} from '../bizonylatkapcsolat.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {BizonylatKapcsolatDto} from '../bizonylatkapcsolatdto';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylatkapcsolat-levalasztas',
  templateUrl: './bizonylatkapcsolat-levalasztas.component.html'
})
export class BizonylatkapcsolatLevalasztasComponent implements OnDestroy {
  @Input() Dto = new BizonylatKapcsolatDto();
  @Output() eventLevalasztasutan = new EventEmitter<boolean>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  bizonylatkapcsolatservice: BizonylatkapcsolatService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              bizonylatkapcsolatservice: BizonylatkapcsolatService) {
    this.bizonylatkapcsolatservice = bizonylatkapcsolatservice;
  }

  async ok() {
    this.spinner = true;
    try {
      const res = await this.bizonylatkapcsolatservice.Delete(this.Dto);
      if (res.Error != null) {
        throw res.Error;
      }

      this.spinner = false;
      this.eventLevalasztasutan.emit(true);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  cancel() {
    this.eventLevalasztasutan.emit(false);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

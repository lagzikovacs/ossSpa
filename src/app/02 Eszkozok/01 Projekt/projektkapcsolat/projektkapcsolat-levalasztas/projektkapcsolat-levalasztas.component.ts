import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy,
  Output
} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {ProjektKapcsolatDto} from '../projektkapcsolatdto';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projektkapcsolat-levalasztas',
  templateUrl: './projektkapcsolat-levalasztas.component.html'
})
export class ProjektkapcsolatLevalasztasComponent implements OnDestroy {
  @Input() Dto = new ProjektKapcsolatDto();
  @Output() eventLevalasztasutan = new EventEmitter<boolean>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  projektkapcsolatservice: ProjektkapcsolatService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              projektkapcsolatservice: ProjektkapcsolatService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  async ok() {
    this.spinner = true;
    try {
      const res = await this.projektkapcsolatservice.Delete(this.Dto.Projektkapcsolatkod);
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

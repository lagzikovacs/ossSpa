import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {BizonylatkapcsolatService} from '../bizonylatkapcsolat.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {BizonylatKapcsolatDto} from '../bizonylatkapcsolatdto';

@Component({
  selector: 'app-bizonylatkapcsolat-levalasztas',
  templateUrl: './bizonylatkapcsolat-levalasztas.component.html'
})
export class BizonylatkapcsolatLevalasztasComponent implements OnDestroy {
  @Input() Dto = new BizonylatKapcsolatDto();
  @Output() eventLevalasztasutan = new EventEmitter<boolean>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  bizonylatkapcsolatservice: BizonylatkapcsolatService;

  constructor(private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              bizonylatkapcsolatservice: BizonylatkapcsolatService) {
    this.bizonylatkapcsolatservice = bizonylatkapcsolatservice;
  }

  ok() {
    this.eppFrissit = true;
    this.bizonylatkapcsolatservice.Delete(this.Dto)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.eppFrissit = false;
        this.eventLevalasztasutan.emit(true);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
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
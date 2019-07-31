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

  bizonylatkapcsolatservice: BizonylatkapcsolatService;
  spinnerservice: SpinnerService;

  constructor(private _errorservice: ErrorService,
              spinnerservice: SpinnerService,
              bizonylatkapcsolatservice: BizonylatkapcsolatService) {
    this.bizonylatkapcsolatservice = bizonylatkapcsolatservice;
    this.spinnerservice = spinnerservice;
  }

  ok() {
    this.spinnerservice.eppFrissit = true;
    this.bizonylatkapcsolatservice.Delete(this.Dto)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.spinnerservice.eppFrissit = false;
        this.eventLevalasztasutan.emit(true);
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
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

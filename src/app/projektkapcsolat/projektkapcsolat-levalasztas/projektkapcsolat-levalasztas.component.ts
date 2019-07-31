import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {ProjektKapcsolatDto} from '../projektkapcsolatdto';

@Component({
  selector: 'app-projektkapcsolat-levalasztas',
  templateUrl: './projektkapcsolat-levalasztas.component.html'
})
export class ProjektkapcsolatLevalasztasComponent implements OnDestroy {
  @Input() Dto = new ProjektKapcsolatDto();
  @Output() eventLevalasztasutan = new EventEmitter<boolean>();

  projektkapcsolatservice: ProjektkapcsolatService;
  spinnerservice: SpinnerService;

  constructor(private _errorservice: ErrorService,
              projektkapcsolatservice: ProjektkapcsolatService,
              spinnerservice: SpinnerService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
    this.spinnerservice = spinnerservice;
  }

  ok() {
    this.spinnerservice.eppFrissit = true;
    this.projektkapcsolatservice.Delete(this.Dto.Projektkapcsolatkod)
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

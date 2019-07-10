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

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  projektkapcsolatservice: ProjektkapcsolatService;

  constructor(projektkapcsolatservice: ProjektkapcsolatService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  ok() {
    this.eppFrissit = true;
    this.projektkapcsolatservice.Delete(this.Dto.Projektkapcsolatkod)
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

import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ProjektkapcsolatService} from '../../02 Eszkozok/01 Projekt/projektkapcsolat/projektkapcsolat.service';
import {ErrorService} from '../../common/errorbox/error.service';
import {ProjektKapcsolatDto} from '../../02 Eszkozok/01 Projekt/projektkapcsolat/projektkapcsolatdto';

@Component({
  selector: 'app-projektkapcsolat-levalasztas',
  templateUrl: './projektkapcsolat-levalasztas.component.html'
})
export class ProjektkapcsolatLevalasztasComponent implements OnDestroy {
  @Input() Dto = new ProjektKapcsolatDto();
  @Output() eventLevalasztasutan = new EventEmitter<boolean>();

  eppFrissit = false;

  projektkapcsolatservice: ProjektkapcsolatService;

  constructor(private _errorservice: ErrorService,
              projektkapcsolatservice: ProjektkapcsolatService) {
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

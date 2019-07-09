import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {ProjektService} from '../../projekt/projekt.service';
import {ProjektKapcsolatParameter} from '../projektkapcsolatparameter';
import {VagolapService} from '../../vagolap/vagolap.service';
import {NumberResult} from '../../dtos/numberresult';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {ProjektKapcsolatResult} from '../projektkapcsolatresult';

@Component({
  selector: 'app-projektkapcsolat-vagolaprol',
  templateUrl: './projektkapcsolat-vagolaprol.component.html'
})
export class ProjektkapcsolatVagolaprolComponent implements OnDestroy {
  @Output() eventVagolaprolutan = new EventEmitter<boolean>();

  ci = 0;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  projektkapcsolatservice: ProjektkapcsolatService;

  constructor(private _projektservice: ProjektService,
              private _vagolapservice: VagolapService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              projektkapcsolatservice: ProjektkapcsolatService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  ok() {
    if (this._vagolapservice.kijeloltekszama() === 0) {
      this._errorservice.Error = 'Nincs kijelölt tétel!';
      return;
    }

    this.ci = 0;
    this.ciklus();
  }

  add(): Promise<ProjektKapcsolatResult> {
    let p: Promise<NumberResult>;

    if (this._vagolapservice.Dto[this.ci].tipus === 0) {
      p = this.projektkapcsolatservice.AddIratToProjekt(new ProjektKapcsolatParameter(
        this._projektservice.Dto[this._projektservice.DtoSelectedIndex].Projektkod,
        0,
        this._vagolapservice.Dto[this.ci].iratkod,
        null
      ));
    } else {
      p = this.projektkapcsolatservice.AddBizonylatToProjekt(new ProjektKapcsolatParameter(
        this._projektservice.Dto[this._projektservice.DtoSelectedIndex].Projektkod,
        this._vagolapservice.Dto[this.ci].bizonylatkod,
        0,
        null
      ));
    }

    return p.then(res => {
      if (res.Error != null) {
        throw res.Error;
      }

      return this.projektkapcsolatservice.Get(res.Result);
    });
  }

  ciklus() {
    this.eppFrissit = true;
    if (this.ci < this._vagolapservice.Dto.length) {
      if (this._vagolapservice.Dto[this.ci].selected) {
        this.add()
          .then(res => {
            if (res.Error != null) {
              throw res.Error;
            }

            this.projektkapcsolatservice.Dto.unshift(res.Result[0]);

            ++this.ci;
            this.ciklus();
          })
          .catch(err => {
            this.eppFrissit = false;
            this._errorservice.Error = err;
          });
      } else {
        ++this.ci;
        this.ciklus();
      }
    } else {
      this.eppFrissit = false;
      this.eventVagolaprolutan.emit(true);
    }
  }

  cancel() {
    this.eventVagolaprolutan.emit(false);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

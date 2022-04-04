import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {ProjektKapcsolatParameter} from '../projektkapcsolatparameter';
import {VagolapService} from '../../05 Segedeszkozok/08 Vagolap/vagolap.service';
import {NumberResult} from '../../common/dtos/numberresult';
import {ErrorService} from '../../common/errorbox/error.service';
import {ProjektKapcsolatResult} from '../projektkapcsolatresult';
import {ProjektKapcsolatDto} from '../projektkapcsolatdto';

@Component({
  selector: 'app-projektkapcsolat-vagolaprol',
  templateUrl: './projektkapcsolat-vagolaprol.component.html'
})
export class ProjektkapcsolatVagolaprolComponent implements OnDestroy {
  @Input() Projektkod = -1;
  @Output() eventVagolaprolutan = new EventEmitter<ProjektKapcsolatDto>();
  @Output() eventVagolaprolutanvege = new EventEmitter<void>();

  ci = 0;
  eppFrissit = false;

  projektkapcsolatservice: ProjektkapcsolatService;

  constructor(private _vagolapservice: VagolapService,
              private _errorservice: ErrorService,
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
        this.Projektkod,
        0,
        this._vagolapservice.Dto[this.ci].iratkod,
        null
      ));
    } else {
      p = this.projektkapcsolatservice.AddBizonylatToProjekt(new ProjektKapcsolatParameter(
        this.Projektkod,
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

            this.eventVagolaprolutan.emit(res.Result[0]);

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
      this.eventVagolaprolutanvege.emit();
    }
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

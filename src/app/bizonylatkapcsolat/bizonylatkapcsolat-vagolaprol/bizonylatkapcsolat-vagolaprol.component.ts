import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {BizonylatkapcsolatService} from '../../03 Bizonylatok/bizonylatkapcsolat/bizonylatkapcsolat.service';
import {BizonylatKapcsolatParam} from '../../03 Bizonylatok/bizonylatkapcsolat/bizonylatkapcsolatparam';
import {VagolapService} from '../../05 Segedeszkozok/08 Vagolap/vagolap.service';
import {ErrorService} from '../../common/errorbox/error.service';
import {BizonylatKapcsolatDto} from '../../03 Bizonylatok/bizonylatkapcsolat/bizonylatkapcsolatdto';
import {BizonylatKapcsolatResult} from '../../03 Bizonylatok/bizonylatkapcsolat/bizonylatkapcsolatresult';
import {NumberResult} from '../../common/dtos/numberresult';

@Component({
  selector: 'app-bizonylatkapcsolat-vagolaprol',
  templateUrl: './bizonylatkapcsolat-vagolaprol.component.html'
})
export class BizonylatkapcsolatVagolaprolComponent implements OnDestroy {
  @Input() Bizonylatkod = -1;
  @Output() eventVagolaprolutan = new EventEmitter<BizonylatKapcsolatDto>();
  @Output() eventVagolaprolutanvege = new EventEmitter<void>();

  ci = 0;
  eppFrissit = false;

  bizonylatkapcsolatservice: BizonylatkapcsolatService;

  constructor(private _vagolapservice: VagolapService,
              private _errorservice: ErrorService,
              bizonylatkapcsolatservice: BizonylatkapcsolatService) {
    this.bizonylatkapcsolatservice = bizonylatkapcsolatservice;
  }

  ok() {
    if (this._vagolapservice.kijeloltekszama() === 0) {
      this._errorservice.Error = 'Nincs kijelölt tétel!';
      return;
    }

    this.ci = 0;
    this.ciklus();
  }

  add(): Promise<BizonylatKapcsolatResult> {
    let p: Promise<NumberResult>;

    if (this._vagolapservice.Dto[this.ci].tipus === 0) {
      p = this.bizonylatkapcsolatservice.AddIratToBizonylat(new BizonylatKapcsolatParam(
        this.Bizonylatkod, this._vagolapservice.Dto[this.ci].iratkod));
    }

    return p.then(res => {
      if (res.Error != null) {
        throw res.Error;
      }

      return this.bizonylatkapcsolatservice.Get(res.Result);
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

import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {BizonylatDto} from '../bizonylatdto';
import {deepCopy} from '../../tools/deepCopy';
import {BizonylatTipusLeiro} from '../bizonylattipusleiro';

@Component({
  selector: 'app-bizonylat-kifizetesrendben',
  templateUrl: './bizonylat-kifizetesrendben.component.html'
})
export class BizonylatKifizetesrendbenComponent implements OnDestroy {
  Dto = new BizonylatDto();
  @Input() set DtoOriginal(value: BizonylatDto) {
    this.Dto = deepCopy(value);
  }
  @Input() bizonylatLeiro = new BizonylatTipusLeiro();
  @Output() eventKifizetesrendbenUtan = new EventEmitter<BizonylatDto>();

  bizonylatservice: BizonylatService;
  spinnerservice: SpinnerService;

  constructor(private _errorservice: ErrorService,
              spinnerservice: SpinnerService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
    this.spinnerservice = spinnerservice;
  }

  modositas() {
    this.spinnerservice.eppFrissit = true;
    this.bizonylatservice.KifizetesRendben(this.Dto)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.bizonylatservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.spinnerservice.eppFrissit = false;
        this.eventKifizetesrendbenUtan.emit(res1.Result[0]);
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {BizonylatDto} from '../bizonylatdto';
import {deepCopy} from '../../tools/deepCopy';
import {BizonylatTipusLeiro} from '../bizonylattipusleiro';

@Component({
  selector: 'app-bizonylat-kiszallitva',
  templateUrl: './bizonylat-kiszallitva.component.html'
})
export class BizonylatKiszallitvaComponent implements OnDestroy {
  Dto = new BizonylatDto();
  @Input() set DtoOriginal(value: BizonylatDto) {
    this.Dto = deepCopy(value);
  }
  @Input() bizonylatLeiro = new BizonylatTipusLeiro();
  @Output() eventKiszallitvaUtan = new EventEmitter<BizonylatDto>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  bizonylatservice: BizonylatService;

  constructor(private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  modositas() {
    this.eppFrissit = true;
    this.bizonylatservice.Kiszallitva(this.Dto)
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

        this.eppFrissit = false;
        this.eventKiszallitvaUtan.emit(res1.Result[0]);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

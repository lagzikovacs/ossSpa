import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {BizonylatKibocsatasParam} from '../bizonylatkibocsatasparam';
import {BizonylatTipus} from '../bizonylattipus';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {deepCopy} from '../../tools/deepCopy';
import {BizonylatDto} from '../bizonylatdto';

@Component({
  selector: 'app-bizonylat-kibocsatas',
  templateUrl: './bizonylat-kibocsatas.component.html'
})
export class BizonylatKibocsatasComponent implements OnDestroy {
  Dto = new BizonylatDto();
  @Input() set DtoOriginal(value: BizonylatDto) {
    this.Dto = deepCopy(value);
  }
  @Output() eventKibocsatasUtan = new EventEmitter<BizonylatDto>();
  @Output() eventKibocsatasUtanKeszpenzes = new EventEmitter<boolean>();

  bizonylatszam = '';
  private _keszpenzes = false;

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

  onSubmit() {
    this.eppFrissit = true;
    this.bizonylatservice.Kibocsatas(new BizonylatKibocsatasParam(this.Dto, this.bizonylatszam))
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
        this.eventKibocsatasUtan.emit(res1.Result[0]);

        this._keszpenzes = (this.bizonylatservice.bizonylatTipus === BizonylatTipus.BejovoSzamla ||
            this.bizonylatservice.bizonylatTipus === BizonylatTipus.ElolegSzamla ||
            this.bizonylatservice.bizonylatTipus === BizonylatTipus.Szamla) &&
            this.Dto.Fizetesimod === 'Készpénz';

        this.eventKibocsatasUtanKeszpenzes.emit(this._keszpenzes);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  cancel() {
    this.eventKibocsatasUtan.emit(null);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {BizonylatService} from '../../03 Bizonylatok/bizonylat/bizonylat.service';
import {ErrorService} from '../../common/errorbox/error.service';
import {deepCopy} from '../../common/deepCopy';
import {BizonylatDto} from '../../03 Bizonylatok/bizonylat/bizonylatdto';
import {BizonylatTipusLeiro} from '../../03 Bizonylatok/bizonylat/bizonylattipusleiro';

@Component({
  selector: 'app-bizonylat-storno',
  templateUrl: './bizonylat-storno.component.html'
})
export class BizonylatStornoComponent implements OnDestroy {
  Dto = new BizonylatDto();
  @Input() set DtoOriginal(value: BizonylatDto) {
    this.Dto = deepCopy(value);
  }
  @Input() bizonylatLeiro = new BizonylatTipusLeiro();
  @Output() eventStornozando = new EventEmitter<BizonylatDto>();
  @Output() eventStornozo = new EventEmitter<BizonylatDto>();
  @Output() eventStornoMegsem = new EventEmitter();

  eppFrissit = false;

  bizonylatservice: BizonylatService;

  constructor(private _errorservice: ErrorService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  ok() {
    const stornozandoKod = this.Dto.Bizonylatkod;
    let stornozoKod = 0;

    this.eppFrissit = true;
    this.bizonylatservice.Storno(this.Dto)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        stornozoKod = res.Result;
        return this.bizonylatservice.Get(stornozandoKod);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.eventStornozando.emit(res1.Result[0]);
        return this.bizonylatservice.Get(stornozoKod);
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        this.eppFrissit = false;
        this.eventStornozo.emit(res2.Result[0]);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  cancel() {
    this.eventStornoMegsem.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

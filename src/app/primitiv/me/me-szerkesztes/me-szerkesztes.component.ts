import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {MeService} from '../me.service';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';

@Component({
  selector: 'app-me-szerkesztes',
  templateUrl: './me-szerkesztes.component.html'
})
export class MeSzerkesztesComponent implements OnDestroy {
  meservice: MeService;

  @Output() KontenerKeres = new EventEmitter<void>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(meservice: MeService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService) {
    this.meservice = meservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.meservice.uj) {
      p = this.meservice.Add(this.meservice.DtoEdited);
    } else {
      p = this.meservice.Update(this.meservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.meservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.meservice.uj) {
          this.meservice.Dto.unshift(res1.Result[0]);
        } else {
          this.meservice.Dto[this.meservice.DtoSelectedIndex] = res1.Result[0];
        }

        this.eppFrissit = false;
        this.KontenerKeres.emit();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  cancel() {
    this.KontenerKeres.emit();
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

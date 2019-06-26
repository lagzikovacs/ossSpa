import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {PenznemService} from '../penznem.service';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';

@Component({
  selector: 'app-penznem-szerkesztes',
  templateUrl: './penznem-szerkesztes.component.html'
})
export class PenznemSzerkesztesComponent implements OnDestroy {
  penznemservice: PenznemService;

  @Output() KontenerKeres = new EventEmitter<void>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(penznemservice: PenznemService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService) {
    this.penznemservice = penznemservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.penznemservice.uj) {
      p = this.penznemservice.Add(this.penznemservice.DtoEdited);
    } else {
      p = this.penznemservice.Update(this.penznemservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.penznemservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.penznemservice.uj) {
          this.penznemservice.Dto.unshift(res1.Result[0]);
        } else {
          this.penznemservice.Dto[this.penznemservice.DtoSelectedIndex] = res1.Result[0];
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

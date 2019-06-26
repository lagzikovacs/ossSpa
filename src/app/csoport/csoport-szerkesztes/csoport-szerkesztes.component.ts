import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {CsoportService} from '../csoport.service';
import {NumberResult} from '../../dtos/numberresult';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-csoport-szerkesztes',
  templateUrl: './csoport-szerkesztes.component.html'
})
export class CsoportSzerkesztesComponent implements OnDestroy {
  csoportservice: CsoportService;

  @Output() KontenerKeres = new EventEmitter<void>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              csoportservice: CsoportService) {
    this.csoportservice = csoportservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.csoportservice.uj) {
      p = this.csoportservice.Add(this.csoportservice.DtoEdited);
    } else {
      p = this.csoportservice.Update(this.csoportservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.csoportservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.csoportservice.uj) {
          this.csoportservice.Dto.unshift(res1.Result[0]);
        } else {
          this.csoportservice.Dto[this.csoportservice.DtoSelectedIndex] = res1.Result[0];
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

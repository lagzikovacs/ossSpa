import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {TeendoService} from '../teendo.service';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';

@Component({
  selector: 'app-teendo-szerkesztes',
  templateUrl: './teendo-szerkesztes.component.html'
})
export class TeendoSzerkesztesComponent implements OnDestroy {
  teendoservice: TeendoService;

  @Output() KontenerKeres = new EventEmitter<void>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(teendoservice: TeendoService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService) {
    this.teendoservice = teendoservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.teendoservice.uj) {
      p = this.teendoservice.Add(this.teendoservice.DtoEdited);
    } else {
      p = this.teendoservice.Update(this.teendoservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.teendoservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.teendoservice.uj) {
          this.teendoservice.Dto.unshift(res1.Result[0]);
        } else {
          this.teendoservice.Dto[this.teendoservice.DtoSelectedIndex] = res1.Result[0];
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

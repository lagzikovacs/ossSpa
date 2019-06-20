import {Component, OnDestroy} from '@angular/core';
import {HelysegService} from '../helyseg.service';
import {NumberResult} from '../../../dtos/numberresult';
import {HelysegContainerMode} from '../helysegcontainermode';
import {HelysegEgyMode} from '../helysegegymode';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';

@Component({
  selector: 'app-helyseg-szerkesztes',
  templateUrl: './helyseg-szerkesztes.component.html'
})
export class HelysegSzerkesztesComponent implements OnDestroy {
  helysegservice: HelysegService;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(helysegservice: HelysegService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService) {
    this.helysegservice = helysegservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.helysegservice.uj) {
      p = this.helysegservice.Add(this.helysegservice.DtoEdited);
    } else {
      p = this.helysegservice.Update(this.helysegservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.helysegservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.helysegservice.uj) {
          this.helysegservice.Dto.unshift(res1.Result[0]);
        } else {
          this.helysegservice.Dto[this.helysegservice.DtoSelectedIndex] = res1.Result[0];
        }

        this.eppFrissit = false;
        this.navigal();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    if (this.helysegservice.uj) {
      this.helysegservice.ContainerMode = HelysegContainerMode.List;
    } else {
      this.helysegservice.EgyMode = HelysegEgyMode.Reszletek;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

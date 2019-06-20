import {Component, OnDestroy} from '@angular/core';
import {AfakulcsService} from '../afakulcs.service';
import {NumberResult} from '../../../dtos/numberresult';
import {AfakulcsContainerMode} from '../afakulcscontainermode';
import {AfakulcsEgyMode} from '../afakulcsegymode';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';

@Component({
  selector: 'app-afakulcs-szerkesztes',
  templateUrl: './afakulcs-szerkesztes.component.html'
})
export class AfakulcsSzerkesztesComponent implements OnDestroy {
  afakulcsservice: AfakulcsService;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(afakulcsservice: AfakulcsService,
              private _spinnerservice: SpinnerService,
              private _errorservice: ErrorService) {
    this.afakulcsservice = afakulcsservice;
  }

  onSubmit() {
    this.eppFrissit = true;

    let p: Promise<NumberResult>;

    if (this.afakulcsservice.uj) {
      p = this.afakulcsservice.Add(this.afakulcsservice.DtoEdited);
    } else {
      p = this.afakulcsservice.Update(this.afakulcsservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.afakulcsservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.afakulcsservice.uj) {
          this.afakulcsservice.Dto.unshift(res1.Result[0]);
        } else {
          this.afakulcsservice.Dto[this.afakulcsservice.DtoSelectedIndex] = res1.Result[0];
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
    if (this.afakulcsservice.uj) {
      this.afakulcsservice.ContainerMode = AfakulcsContainerMode.List;
    } else {
      this.afakulcsservice.EgyMode = AfakulcsEgyMode.Reszletek;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

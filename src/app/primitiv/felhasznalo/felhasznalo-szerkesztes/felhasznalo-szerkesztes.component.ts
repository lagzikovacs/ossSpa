import {Component, OnDestroy} from '@angular/core';
import {FelhasznaloService} from '../felhasznalo.service';
import {NumberResult} from '../../../dtos/numberresult';
import {FelhasznaloContainerMode} from '../felhasznalocontainermode';
import {FelhasznaloEgyMode} from '../felhasznaloegymode';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';

@Component({
  selector: 'app-felhasznalo-szerkesztes',
  templateUrl: './felhasznalo-szerkesztes.component.html'
})
export class FelhasznaloSzerkesztesComponent implements OnDestroy {
  felhasznaloservice: FelhasznaloService;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(felhasznaloservice: FelhasznaloService,
              private _spinnerservice: SpinnerService,
              private _errorservice: ErrorService) {
    this.felhasznaloservice = felhasznaloservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.felhasznaloservice.uj) {
      p = this.felhasznaloservice.Add(this.felhasznaloservice.DtoEdited);
    } else {
      p = this.felhasznaloservice.Update(this.felhasznaloservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.felhasznaloservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.felhasznaloservice.uj) {
          this.felhasznaloservice.Dto.unshift(res1.Result[0]);
        } else {
          this.felhasznaloservice.Dto[this.felhasznaloservice.DtoSelectedIndex] = res1.Result[0];
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
    if (this.felhasznaloservice.uj) {
      this.felhasznaloservice.ContainerMode = FelhasznaloContainerMode.List;
    } else {
      this.felhasznaloservice.EgyMode = FelhasznaloEgyMode.Reszletek;
    }
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

import {Component, OnDestroy} from '@angular/core';
import {FizetesimodService} from '../fizetesimod.service';
import {FizetesimodContainerMode} from '../fizetesimodcontainermode';
import {FizetesimodEgyMode} from '../fizetesimodegymode';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';

@Component({
  selector: 'app-fizetesimod-szerkesztes',
  templateUrl: './fizetesimod-szerkesztes.component.html'
})
export class FizetesimodSzerkesztesComponent implements OnDestroy {
  fizetesimodservice: FizetesimodService;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(fizetesimodservice: FizetesimodService,
              private _spinnerservice: SpinnerService,
              private _errorservice: ErrorService) {
    this.fizetesimodservice = fizetesimodservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.fizetesimodservice.uj) {
      p = this.fizetesimodservice.Add(this.fizetesimodservice.DtoEdited);
    } else {
      p = this.fizetesimodservice.Update(this.fizetesimodservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.fizetesimodservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.fizetesimodservice.uj) {
          this.fizetesimodservice.Dto.unshift(res1.Result[0]);
        } else {
          this.fizetesimodservice.Dto[this.fizetesimodservice.DtoSelectedIndex] = res1.Result[0];
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
    if (this.fizetesimodservice.uj) {
      this.fizetesimodservice.ContainerMode = FizetesimodContainerMode.List;
    } else {
      this.fizetesimodservice.EgyMode = FizetesimodEgyMode.Reszletek;
    }
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

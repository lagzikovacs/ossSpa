import {IrattipusService} from '../irattipus.service';
import {Component, OnDestroy} from '@angular/core';
import {IrattipusContainerMode} from '../irattipuscontainermode';
import {IrattipusEgyMode} from '../irattipusegymode';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';

@Component({
  selector: 'app-irattipus-szerkesztes',
  templateUrl: './irattipus-szerkesztes.component.html'
})
export class IrattipusSzerkesztesComponent implements OnDestroy {
  irattipusservice: IrattipusService;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(irattipusservice: IrattipusService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService) {
    this.irattipusservice = irattipusservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.irattipusservice.uj) {
      p = this.irattipusservice.Add(this.irattipusservice.DtoEdited);
    } else {
      p = this.irattipusservice.Update(this.irattipusservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.irattipusservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.irattipusservice.uj) {
          this.irattipusservice.Dto.unshift(res1.Result[0]);
        } else {
          this.irattipusservice.Dto[this.irattipusservice.DtoSelectedIndex] = res1.Result[0];
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
    if (this.irattipusservice.uj) {
      this.irattipusservice.ContainerMode = IrattipusContainerMode.List;
    } else {
      this.irattipusservice.EgyMode = IrattipusEgyMode.Reszletek;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

import {Component, OnDestroy} from '@angular/core';
import {BizonylatkapcsolatService} from '../bizonylatkapcsolat.service';
import {BizonylatKapcsolatContainerMode} from '../bizonylatkapcsolatcontainermode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-bizonylat-irat-levalasztas',
  templateUrl: './bizonylat-irat-levalasztas.component.html'
})
export class BizonylatIratLevalasztasComponent implements OnDestroy {
  bizonylatkapcsolatservice: BizonylatkapcsolatService;

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
              bizonylatkapcsolatservice: BizonylatkapcsolatService) {
    this.bizonylatkapcsolatservice = bizonylatkapcsolatservice;
  }

  ok() {
    this.eppFrissit = true;
    this.bizonylatkapcsolatservice.Delete(this.bizonylatkapcsolatservice.Dto[this.bizonylatkapcsolatservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatkapcsolatservice.Dto.splice(this.bizonylatkapcsolatservice.DtoSelectedIndex, 1);
        this.bizonylatkapcsolatservice.DtoSelectedIndex = -1;

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
    this.bizonylatkapcsolatservice.ContainerMode = BizonylatKapcsolatContainerMode.List;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
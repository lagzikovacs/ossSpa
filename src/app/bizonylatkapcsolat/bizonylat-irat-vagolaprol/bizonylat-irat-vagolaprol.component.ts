import {Component, OnDestroy} from '@angular/core';
import {BizonylatkapcsolatService} from '../bizonylatkapcsolat.service';
import {BizonylatKapcsolatContainerMode} from '../bizonylatkapcsolatcontainermode';
import {BizonylatService} from '../../bizonylat/bizonylat.service';
import {BizonylatKapcsolatParam} from '../bizonylatkapcsolatparam';
import {VagolapService} from '../../vagolap/vagolap.service';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-bizonylat-irat-vagolaprol',
  templateUrl: './bizonylat-irat-vagolaprol.component.html'
})
export class BizonylatIratVagolaprolComponent implements OnDestroy {

  bizonylatkapcsolatservice: BizonylatkapcsolatService;
  eppFrissit = false;

  constructor(private _bizonylatservice: BizonylatService,
              private _vagolapservice: VagolapService,
              private _errorservice: ErrorService,
              bizonylatkapcsolatservice: BizonylatkapcsolatService) {
    this.bizonylatkapcsolatservice = bizonylatkapcsolatservice;
  }

  ok() {
    if (this._vagolapservice.kijeloltiratokszama() === 0) {
      this._errorservice.Error = 'Nincs kijelölt tétel!';
      return;
    }

    this.eppFrissit = true;
    for (let i = 0; i < this._vagolapservice.Dto.length; i++) {
      if (this._vagolapservice.Dto[i].tipus === 0 && this._vagolapservice.Dto[i].selected) {
        this.bizonylatkapcsolatservice.AddIratToBizonylat(new BizonylatKapcsolatParam(
          this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].Bizonylatkod,
          this._vagolapservice.Dto[i].iratkod
        ))
          .then(res => {
            if (res.Error != null) {
              throw res.Error;
            }

            return this.bizonylatkapcsolatservice.Get(res.Result);
          })
          .then(res1 => {
            if (res1.Error != null) {
              throw res1.Error;
            }

            this.bizonylatkapcsolatservice.Dto.unshift(res1.Result[0]);
          })
          .catch(err => {
            this.eppFrissit = false;
            this._errorservice.Error = err;
          });
      }
    }
    this.eppFrissit = false;
    this.navigal();
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

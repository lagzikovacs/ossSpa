import {Component, OnDestroy} from '@angular/core';
import {BizonylatesIratContainerMode} from '../bizonylatesiratcontainermode';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {ProjektService} from '../../projekt/projekt.service';
import {ProjektKapcsolatParameter} from '../projektkapcsolatparameter';
import {VagolapService} from '../../vagolap/vagolap.service';
import {NumberResult} from '../../dtos/numberresult';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-projektkapcsolat-vagolaprol',
  templateUrl: './projektkapcsolat-vagolaprol.component.html'
})
export class ProjektkapcsolatVagolaprolComponent implements OnDestroy {
  projektkapcsolatservice: ProjektkapcsolatService;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _projektservice: ProjektService,
              private _vagolapservice: VagolapService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              projektkapcsolatservice: ProjektkapcsolatService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  ok() {
    if (this._vagolapservice.kijeloltekszama() === 0) {
      this._errorservice.Error = 'Nincs kijelölt tétel!';
      return;
    }

    let p: Promise<NumberResult>;
    this.eppFrissit = true;

    for (let i = 0; i < this._vagolapservice.Dto.length; i++) {
      if (this._vagolapservice.Dto[i].selected) {
        if (this._vagolapservice.Dto[i].tipus === 0) {
          p = this.projektkapcsolatservice.AddIratToProjekt(new ProjektKapcsolatParameter(
            this._projektservice.Dto[this._projektservice.DtoSelectedIndex].Projektkod,
            0,
            this._vagolapservice.Dto[i].iratkod,
            null
          ));
        } else {
          p = this.projektkapcsolatservice.AddBizonylatToProjekt(new ProjektKapcsolatParameter(
            this._projektservice.Dto[this._projektservice.DtoSelectedIndex].Projektkod,
            this._vagolapservice.Dto[i].bizonylatkod,
            0,
            null
          ));
        }

        p.then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          return this.projektkapcsolatservice.Get(res.Result);
        })
          .then(res1 => {
            if (res1.Error != null) {
              throw res1.Error;
            }

            this.projektkapcsolatservice.Dto.unshift(res1.Result[0]);
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
    this.projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.List;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

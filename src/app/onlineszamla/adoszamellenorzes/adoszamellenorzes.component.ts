import {Component, OnDestroy} from '@angular/core';
import {OnlineszamlaService} from '../onlineszamla.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-adoszamellenorzes',
  templateUrl: './adoszamellenorzes.component.html'
})
export class AdoszamellenorzesComponent implements OnDestroy {
  navfeltoltesservice: OnlineszamlaService;
  adoszam = '';
  valasz = '';

  spinnerservice: SpinnerService;

  constructor(private _errorservice: ErrorService,
              navfeltoltesservice: OnlineszamlaService,
              spinnerservice: SpinnerService) {
    this.navfeltoltesservice = navfeltoltesservice;
    this.spinnerservice = spinnerservice;
  }

  onSubmit() {
    this.valasz = '';
    this.spinnerservice.eppFrissit = true;
    this.navfeltoltesservice.Adoszamellenorzes(this.adoszam)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.valasz = res.Result;
        this.spinnerservice.eppFrissit = false;
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

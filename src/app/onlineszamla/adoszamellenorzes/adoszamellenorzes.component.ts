import {Component, OnDestroy} from '@angular/core';
import {OnlineszamlaService} from '../onlineszamla.service';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-adoszamellenorzes',
  templateUrl: './adoszamellenorzes.component.html'
})
export class AdoszamellenorzesComponent implements OnDestroy {
  navfeltoltesservice: OnlineszamlaService;
  adoszam = '';
  valasz = '';

  eppFrissit = false;

  constructor(private _errorservice: ErrorService,
              navfeltoltesservice: OnlineszamlaService) {
    this.navfeltoltesservice = navfeltoltesservice;
  }

  onSubmit() {
    this.valasz = '';
    this.eppFrissit = true;
    this.navfeltoltesservice.Adoszamellenorzes(this.adoszam)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.valasz = res.Result;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

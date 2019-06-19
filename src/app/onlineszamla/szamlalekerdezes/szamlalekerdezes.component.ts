import {Component, OnDestroy} from '@angular/core';
import {OnlineszamlaService} from '../onlineszamla.service';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-szamlalekerdezes',
  templateUrl: './szamlalekerdezes.component.html'
})
export class SzamlalekerdezesComponent implements OnDestroy {
  eppFrissit = false;
  navexportellenorzesservice: OnlineszamlaService;
  szamlaszam = '';
  valasz = '';

  constructor(navexportellenorzesservice: OnlineszamlaService,
              private _errorservice: ErrorService) {
    this.navexportellenorzesservice = navexportellenorzesservice;
  }

  onSubmit() {
    this.valasz = '';
    this.eppFrissit = true;
    this.navexportellenorzesservice.Szamlalekerdezes(this.szamlaszam)
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

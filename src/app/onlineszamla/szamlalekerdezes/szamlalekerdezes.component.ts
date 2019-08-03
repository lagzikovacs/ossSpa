import {Component, OnDestroy} from '@angular/core';
import {OnlineszamlaService} from '../onlineszamla.service';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-szamlalekerdezes',
  templateUrl: './szamlalekerdezes.component.html'
})
export class SzamlalekerdezesComponent implements OnDestroy {
  szamlaszam = '';
  valasz = '';

  eppFrissit = false;

  onlineszamlaservice: OnlineszamlaService;

  constructor(private _errorservice: ErrorService,
              onlineszamlaservice: OnlineszamlaService) {
    this.onlineszamlaservice = onlineszamlaservice;
  }

  onSubmit() {
    this.valasz = '';
    this.eppFrissit = true;
    this.onlineszamlaservice.Szamlalekerdezes(this.szamlaszam)
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

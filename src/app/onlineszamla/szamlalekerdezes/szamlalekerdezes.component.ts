import {Component, OnDestroy} from '@angular/core';
import {OnlineszamlaService} from '../onlineszamla.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-szamlalekerdezes',
  templateUrl: './szamlalekerdezes.component.html'
})
export class SzamlalekerdezesComponent implements OnDestroy {
  szamlaszam = '';
  valasz = '';

  onlineszamlaservice: OnlineszamlaService;
  spinnerservice: SpinnerService;

  constructor(private _errorservice: ErrorService,
              onlineszamlaservice: OnlineszamlaService,
              spinnerservice: SpinnerService) {
    this.onlineszamlaservice = onlineszamlaservice;
    this.spinnerservice = spinnerservice;
  }

  onSubmit() {
    this.valasz = '';
    this.spinnerservice.eppFrissit = true;
    this.onlineszamlaservice.Szamlalekerdezes(this.szamlaszam)
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

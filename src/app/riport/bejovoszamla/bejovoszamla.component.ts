import {Component, OnDestroy} from '@angular/core';
import {RiportService} from '../riport.service';
import * as moment from 'moment';
import {Szempont} from '../../enums/szempont';
import {SzMT} from '../../dtos/szmt';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {Riportciklus} from '../riportciklus';

@Component({
  selector: 'app-bejovoszamla',
  templateUrl: './bejovoszamla.component.html'
})
export class BejovoszamlaComponent implements OnDestroy {
  rc: Riportciklus;

  tol = '2019-01-01';
  ig = '2019-12-31';

  riportservice: RiportService;
  spinnerservice: SpinnerService;

  constructor(private _errorservice: ErrorService,
              spinnerservice: SpinnerService,
              riportservice: RiportService) {
    this.riportservice = riportservice;
    this.spinnerservice = spinnerservice;

    this.rc = new Riportciklus(_errorservice, spinnerservice, riportservice, 'Bejövő számla.xls');
  }

  onSubmit() {
    this.spinnerservice.eppFrissit = true;
    this.rc.megszakitani = false;

    const fi = [
      new SzMT(Szempont.Null, moment(this.tol).toISOString(true)),
      new SzMT(Szempont.Null, moment(this.ig).toISOString(true))
    ];

    this.riportservice.BejovoSzamlaTaskStart(fi)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.rc.tasktoken = res.Result;
        this.rc.ciklus();
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onCancel() {
    this.rc.megszakitani = true;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

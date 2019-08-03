import {Component, OnDestroy} from '@angular/core';
import {RiportService} from '../riport.service';
import {SzMT} from '../../dtos/szmt';
import {Szempont} from '../../enums/szempont';
import * as moment from 'moment';
import {ErrorService} from '../../tools/errorbox/error.service';
import {Riportciklus} from '../riportciklus';

@Component({
  selector: 'app-kimenoszamla',
  templateUrl: './kimenoszamla.component.html'
})
export class KimenoszamlaComponent implements OnDestroy {
  rc: Riportciklus;

  tol = '2019-01-01';
  ig = '2019-12-31';

  eppFrissit = false;

  riportservice: RiportService;

  constructor(private _errorservice: ErrorService,
              riportservice: RiportService) {
    this.riportservice = riportservice;

    this.rc = new Riportciklus(_errorservice, riportservice, 'Kimenő számla.xls');
    this.rc.eventSpinnervege.on(() => {
      this.eppFrissit = false;
    });
  }

  onSubmit() {
    this.eppFrissit = true;
    this.rc.megszakitani = false;

    const fi = [
      new SzMT(Szempont.Null, moment(this.tol).toISOString(true)),
      new SzMT(Szempont.Null, moment(this.ig).toISOString(true))
    ];

    this.riportservice.KimenoSzamlaTaskStart(fi)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.rc.tasktoken = res.Result;
        this.rc.ciklus();
      })
      .catch(err => {
        this.eppFrissit = false;
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

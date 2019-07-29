import {Component, Input, OnDestroy} from '@angular/core';
import * as moment from 'moment';
import {SzMT} from '../../dtos/szmt';
import {Szempont} from '../../enums/szempont';
import {RiportService} from '../../riport/riport.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {Riportciklus} from '../../riport/riportciklus';

@Component({
  selector: 'app-penztar-export',
  templateUrl: './penztar-export.component.html'
})
export class PenztarExportComponent implements OnDestroy {
  rc: Riportciklus;
  @Input() Penztarkod = -1;

  tol = '2018-01-01';
  ig = '2018-12-31';

  riportservice: RiportService;
  spinnerservice: SpinnerService;

  constructor(private _errorservice: ErrorService,
              spinnerservice: SpinnerService,
              riportservice: RiportService) {
    this.riportservice = riportservice;
    this.spinnerservice = spinnerservice;

    this.rc = new Riportciklus(_errorservice, spinnerservice, riportservice, 'Pénztártétel.xls');
  }

  onSubmit() {
    this.spinnerservice.eppFrissit = true;
    this.rc.megszakitani = false;

    const fi = [
      new SzMT(Szempont.Null, this.Penztarkod.toString()),
      new SzMT(Szempont.Null, moment(this.tol).toISOString(true)),
      new SzMT(Szempont.Null, moment(this.ig).toISOString(true))
    ];

    this.riportservice.PenztarTetelTaskStart(fi)
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

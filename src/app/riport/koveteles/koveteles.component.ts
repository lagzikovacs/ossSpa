import {Component, OnDestroy} from '@angular/core';
import {RiportService} from '../riport.service';
import {Szempont} from '../../enums/szempont';
import {SzMT} from '../../dtos/szmt';
import * as moment from 'moment';
import {ErrorService} from '../../tools/errorbox/error.service';
import {Riportciklus} from '../riportciklus';

@Component({
  selector: 'app-koveteles',
  templateUrl: './koveteles.component.html'
})
export class KovetelesComponent implements OnDestroy {
  rc: Riportciklus;

  datum = moment().format('YYYY-MM-DD');

  eppFrissit = false;

  riportservice: RiportService;

  constructor(private _errorservice: ErrorService,
              riportservice: RiportService) {
    this.riportservice = riportservice;

    this.rc = new Riportciklus(_errorservice, riportservice, 'Követelés.xls');
    this.rc.eventSpinnervege.on(() => {
      this.eppFrissit = false;
    });
  }

  onSubmit() {
    this.eppFrissit = true;
    this.rc.megszakitani = false;

    const fi = [
      new SzMT(Szempont.Null, moment(this.datum).toISOString(true))
    ];
    this.riportservice.KovetelesekTaskStart(fi)
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

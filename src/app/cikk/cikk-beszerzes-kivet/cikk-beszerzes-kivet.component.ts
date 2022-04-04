import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CikkService} from '../../01 Torzsadatok/06 Cikk/cikk.service';
import {CikkMozgasTetelDto} from '../../01 Torzsadatok/06 Cikk/cikkmozgasteteldto';
import {ErrorService} from '../../common/errorbox/error.service';
import {CikkMozgasParam} from '../../01 Torzsadatok/06 Cikk/cikkmozgasparam';

@Component({
  selector: 'app-cikk-beszerzes-kivet',
  templateUrl: './cikk-beszerzes-kivet.component.html'
})
export class CikkBeszerzesKivetComponent implements OnInit, OnDestroy {
  @Input() Cikkkod = -1;
  @Input() BizonylattipusKod: number;

  MozgasDto = new Array<CikkMozgasTetelDto>();

  eppFrissit = false;

  cikkservice: CikkService;

  constructor(private _errorservice: ErrorService,
              cikkservice: CikkService) {
    this.cikkservice = cikkservice;
  }

  ngOnInit() {
    this.eppFrissit = true;
    this.cikkservice.Mozgas(new CikkMozgasParam(this.Cikkkod, this.BizonylattipusKod))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.MozgasDto = res.Result;
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

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CikkMozgasTetelDto} from '../cikkmozgasteteldto';
import {ErrorService} from '../../../common/errorbox/error.service';
import {CikkMozgasParam} from "../cikkmozgasparam";
import {CikkService} from "../cikk.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cikk-beszerzes-kivet',
  templateUrl: './cikk-beszerzes-kivet.component.html'
})
export class CikkBeszerzesKivetComponent implements OnInit, OnDestroy {
  @Input() Cikkkod = -1;
  @Input() BizonylattipusKod: number;

  MozgasDto = new Array<CikkMozgasTetelDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  cikkservice: CikkService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              cikkservice: CikkService) {
    this.cikkservice = cikkservice;
  }

  async ngOnInit() {
    this.spinner = true;
    try {
      const res = await this.cikkservice.Mozgas(new CikkMozgasParam(this.Cikkkod, this.BizonylattipusKod));
      if (res.Error != null) {
        throw res.Error;
      }

      this.MozgasDto = res.Result;
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

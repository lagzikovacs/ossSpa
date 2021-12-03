import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {BizonylatMintaAlapjanParam} from '../bizonylatmintaalapjan';
import {ErrorService} from '../../tools/errorbox/error.service';
import {LogonService} from '../../logon/logon.service';

@Component({
  selector: 'app-bizonylat-errol',
  templateUrl: './bizonylat-errol.component.html'
})
export class BizonylatErrolComponent implements OnInit, OnDestroy {
  @Input() Bizonylatkod = -1;
  @Output() eventBizonylaterrolUtan = new EventEmitter<boolean>();

  entryindex = 4;
  kesz = false;
  ujbizonylatkod = 0;

  eppFrissit = false;

  bizonylatservice: BizonylatService;

  constructor(private _errorservice: ErrorService,
              private _logonservice: LogonService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  ngOnInit() {
    for (let i = 0; i < this.bizonylatservice.tipusok.length; i++) {
      this.bizonylatservice.tipusok[i][2] = !this._logonservice.Jogaim.includes(this.bizonylatservice.tipusok[i][3]);
    }
  }

  onSubmit() {
    if (!this.kesz) {
      this.eppFrissit = true;
      this.bizonylatservice.UjBizonylatMintaAlapjan(new BizonylatMintaAlapjanParam(
        this.Bizonylatkod, this.bizonylatservice.tipusok[this.entryindex][1]))
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.ujbizonylatkod = res.Result;
          this.kesz = true;
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.eventBizonylaterrolUtan.emit(true);
    }
  }

  cancel() {
    this.eventBizonylaterrolUtan.emit(false);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

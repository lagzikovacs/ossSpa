import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {BizonylatService} from '../../bizonylat.service';

@Component({
  selector: 'app-bizonylat-fuvarszamla-torles',
  templateUrl: './bizonylat-fuvarszamla-torles.component.html'
})
export class BizonylatFuvarszamlaTorlesComponent implements OnDestroy {
  @Input() BizonylatKod: number;
  @Output() eventMegsem = new EventEmitter();
  eppFrissit = false;
  bizonylatservice: BizonylatService;

  constructor(private _errorservice: ErrorService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  doOk() {
    this.eppFrissit = true;
    // this.bizonylatservice.Fuvardijtorles(this.BizonylatKod)
    //   .then(res => {
    //     if (res.Error != null) {
    //       throw res.Error;
    //     }
    //
    //     this.eppFrissit = false;
    //     this.eventMegsem.emit();
    //   })
    //   .catch(err => {
    //     this.eppFrissit = false;
    //     this._errorservice.Error = err;
    //   });
  }

  doCancel() {
    this.eventMegsem.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

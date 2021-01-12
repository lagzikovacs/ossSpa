import {Component, OnDestroy, Output, EventEmitter, Input} from '@angular/core';
import {BizonylatService} from '../../bizonylat.service';
import {ErrorService} from '../../../tools/errorbox/error.service';

@Component({
  selector: 'app-bizonylat-fuvarszamla-uj',
  templateUrl: './bizonylat-fuvarszamla-uj.component.html'
})
export class BizonylatFuvarszamlaUjComponent implements OnDestroy {
  @Input() BizonylatKod: number;
  @Output() eventMegsem = new EventEmitter();
  eppFrissit = false;
  bizonylatservice: BizonylatService;

  constructor(private _errorservice: ErrorService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  doOk() {

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

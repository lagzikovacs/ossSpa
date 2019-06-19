import {Component, OnDestroy, OnInit} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-bizonylat-osnxml',
  templateUrl: './bizonylat-osnxml.component.html'
})
export class BizonylatOSNxmlComponent implements OnInit, OnDestroy {

  bizonylatservice: BizonylatService;
  eppFrissit = false;
  result = '';

  constructor(bizonylatservice: BizonylatService,
              private _errorservice: ErrorService) {
    this.bizonylatservice = bizonylatservice;
  }

  ngOnInit() {
    this.eppFrissit = true;
    this.bizonylatservice.LetoltesOsnxmlFormatumban(this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Bizonylatkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.result = res.Result;
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

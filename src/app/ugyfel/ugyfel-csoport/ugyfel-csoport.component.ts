import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {UgyfelService} from '../ugyfel.service';
import {deepCopy} from '../../tools/deepCopy';
import {propCopy} from '../../tools/propCopy';
import {UgyfelDto} from '../ugyfeldto';

@Component({
  selector: 'app-ugyfel-csoport',
  templateUrl: './ugyfel-csoport.component.html'
})
export class UgyfelCsoportComponent implements OnInit, OnDestroy {
  DtoEdited = new UgyfelDto();
  ugyfelservice: UgyfelService;
  selected = 0;

  entries = ['(0) Mind', '(1) Kiemelt'];

  @Output() eventSzerkeszteskesz = new EventEmitter<void>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(ugyfelservice: UgyfelService,
              private _spinnerservice: SpinnerService,
              private _errorservice: ErrorService) {
    this.ugyfelservice = ugyfelservice;
  }

  ngOnInit() {
    this.DtoEdited = deepCopy(this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex]);
    this.selected = this.DtoEdited.Csoport;
  }

  change(i) {
    this.selected = i;
    this.DtoEdited.Csoport = this.selected;
  }

  okClick() {
    this.eppFrissit = true;
    this.ugyfelservice.Update(this.DtoEdited)
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        return this.ugyfelservice.Get(res1.Result);
      })
      .then(res2 => {
        if (res2.Error !== null) {
          throw res2.Error;
        }

        propCopy(res2.Result[0], this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex]);

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  cancelClick() {
    this.eventSzerkeszteskesz.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ErrorService} from '../../tools/errorbox/error.service';
import {UgyfelService} from '../ugyfel.service';
import {deepCopy} from '../../tools/deepCopy';
import {UgyfelDto} from '../ugyfeldto';

@Component({
  selector: 'app-ugyfel-csoport',
  templateUrl: './ugyfel-csoport.component.html'
})
export class UgyfelCsoportComponent implements OnInit, OnDestroy {
  DtoEdited = new UgyfelDto();
  @Input() set DtoOriginal(value: UgyfelDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<UgyfelDto>();

  entries = ['(0) Mind', '(1) Kiemelt'];
  selected = 0;
  eppFrissit = false;

  ugyfelservice: UgyfelService;

  constructor(private _errorservice: ErrorService,
              ugyfelservice: UgyfelService) {
    this.ugyfelservice = ugyfelservice;
  }

  ngOnInit() {
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

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res2.Result[0]);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  cancelClick() {
    this.eventSzerkeszteskesz.emit(null);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

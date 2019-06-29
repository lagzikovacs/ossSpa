import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {UgyfelDto} from '../ugyfeldto';
import {UgyfelService} from '../ugyfel.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {deepCopy} from '../../tools/deepCopy';

@Component({
  selector: 'app-ugyfel-vcard',
  templateUrl: './ugyfel-vcard.component.html'
})
export class UgyfelVcardComponent implements OnInit, OnDestroy {
  ugyfelservice: UgyfelService;
  @Output() LetoltesClick = new EventEmitter<void>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(ugyfelservice: UgyfelService,
              private _spinnerservice: SpinnerService) {
    this.ugyfelservice = ugyfelservice;
  }

  ngOnInit() {
    this.ugyfelservice.DtoEdited = deepCopy(this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex]);
  }

  letoltesClick() {
    this.LetoltesClick.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

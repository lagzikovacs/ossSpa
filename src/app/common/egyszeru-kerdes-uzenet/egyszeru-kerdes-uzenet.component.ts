import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output
} from '@angular/core';
import {tick} from '@angular/core/testing';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-egyszeru-kerdes-uzenet',
  templateUrl: './egyszeru-kerdes-uzenet.component.html'
})
export class EgyszeruKerdesUzenetComponent implements OnDestroy {
  @Input() cim = '';
  @Input() kerdes = '';
  _uzenet = '';
  @Input() set uzenet(value: string) {
    this._uzenet = value;
    this.docdr();
  }

  @Output() eventOk = new EventEmitter();
  @Output() eventCancel = new EventEmitter();

  okcancel = true;

  constructor(private _cdr: ChangeDetectorRef) {

  }

  docdr() {
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  doOk() {
    this.okcancel = false;
    this.docdr();

    this.eventOk.emit();
  }

  doCancel() {
    this.eventCancel.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

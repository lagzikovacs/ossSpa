import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {tick} from '@angular/core/testing';

@Component({
  selector: 'app-egyszeru-kerdes-uzenet',
  templateUrl: './egyszeru-kerdes-uzenet.component.html'
})
export class EgyszeruKerdesUzenetComponent implements OnInit, OnDestroy {
  @Input() cim = '';
  @Input() kerdes = '';
  @Input() uzenet = '';

  @Output() eventOk = new EventEmitter();
  @Output() eventCancel = new EventEmitter();

  okcancel = true;

  constructor() { }

  ngOnInit(): void {
  }

  doOk(e) {
    this.okcancel = false;
    this.eventOk.emit();
  }

  doCancel(e) {
    this.eventCancel.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

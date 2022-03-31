import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnDestroy  {
  @Input() StatuszSzurok: string[] = [];
  @Input() visStatusz = false;

  @Input() Szurok: string[] = [];

  @Input() enKereses = true;
  @Input() visUj = true;
  @Input() enUj = true;
  @Input() visZoom = false;

  @Output() Kereses = new EventEmitter<void>();
  @Output() Uj = new EventEmitter<void>();
  @Output() StopZoom = new EventEmitter<void>();

  _statusz = 1;
  @Input() set statusz(value: number) {
    this._statusz = value;
  }
  @Output() statuszChange: EventEmitter<number> = new EventEmitter();

  _szempont = 1;
  @Input() set szempont(value: number) {
    this._szempont = value;
  }
  @Output() szempontChange: EventEmitter<number> = new EventEmitter();

  _minta = '';
  @Input() set minta(value: string) {
    this._minta = value;
  }
  @Output() mintaChange: EventEmitter<string> = new EventEmitter();


  doStatuszChange(event) {
    this._statusz = parseInt(event.target.value, 10);
    this.statuszChange.emit(this._statusz);
  }
  doSzempontChange(event) {
    this._szempont = parseInt(event.target.value, 10);
    this.szempontChange.emit(this._szempont);
  }
  doMintaChange(event) {
    this.mintaChange.emit(event.target.value);
  }


  doKereses() {
    this.Kereses.emit();
  }

  doUj() {
    this.Uj.emit();
  }
  doStopZoom() {
    this.StopZoom.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

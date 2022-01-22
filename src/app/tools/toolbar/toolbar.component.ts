import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements AfterViewInit, OnDestroy  {
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

  // azért kell a kétirányú adatkötés, h a szülő komponens újrainicializálja a toolbart
  // pl. egy tétel szerkesztése után

  _statusz = 1;
  @ViewChild('Statusz', {static: true}) StatuszCombobox: ElementRef;
  @Input()
  set statusz(value: number) {
    this._statusz = value;
  }
  @Output() statuszChange: EventEmitter<number> = new EventEmitter();


  _szempont = 1;
  @ViewChild('Szempont', {static: true}) SzempontCombobox: ElementRef;
  @Input()
  set szempont(value: number) {
    this._szempont = value;
  }
  @Output() szempontChange: EventEmitter<number> = new EventEmitter();

  @ViewChild('Minta', {static: true}) MintaTextBox: ElementRef;
  @Input()
  set minta(value: string) {
    this.MintaTextBox.nativeElement.value = value;
  }
  @Output() mintaChange: EventEmitter<string> = new EventEmitter();

  ngAfterViewInit(): void {
    this.StatuszCombobox.nativeElement.addEventListener('change', (event) => {
      this._statusz = event.target.value;
      this.statuszChange.emit(this._statusz);
    });


    this.SzempontCombobox.nativeElement.addEventListener('change', (event) => {
      this._szempont = event.target.value;
      this.szempontChange.emit(this._szempont);
    });
    this.MintaTextBox.nativeElement.addEventListener('keyup', () => {
      this.mintaChange.emit(this.MintaTextBox.nativeElement.value);
    });
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

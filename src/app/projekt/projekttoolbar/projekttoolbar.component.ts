import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-projekttoolbar',
  templateUrl: './projekttoolbar.component.html'
})
export class ProjektToolbarComponent implements AfterViewInit, OnDestroy {
  @Input() Statuszszurok: string[] = [];
  @Input() Teendoszurok: string[] = [];
  @Input() Szurok: string[] = [];

  @Input() enKereses = true;
  @Input() enUj = true;
  @Input() enExport = true;

  @Output() Kereses = new EventEmitter<void>();
  @Output() Uj = new EventEmitter<void>();
  @Output() Export = new EventEmitter<number>();

  // azért kell a kétirányú adatkötés, h a szülő komponens újrainicializálja a toolbart
  // pl. egy tétel szerkesztése után

  _statuszszempont = 0;
  _teendoszempont = 0;
  _szempont = 0;

  @ViewChild('Statuszszempont', {static: true}) StatuszszempontCombobox: ElementRef;
  @Input()
  set statuszszempont(value: number) {
    this._statuszszempont = value;
  }
  @Output() statuszszempontChange: EventEmitter<number> = new EventEmitter();

  @ViewChild('Teendoszempont', {static: true}) TeendoszempontCombobox: ElementRef;
  @Input()
  set teendoszempont(value: number) {
    this._teendoszempont = value;
  }
  @Output() teendoszempontChange: EventEmitter<number> = new EventEmitter();

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
    this.StatuszszempontCombobox.nativeElement.addEventListener('change', (event) => {
      this._statuszszempont = event.target.value;
      this.statuszszempontChange.emit(this._statuszszempont);
    });
    this.TeendoszempontCombobox.nativeElement.addEventListener('change', (event) => {
      this._teendoszempont = event.target.value;
      this.teendoszempontChange.emit(this._teendoszempont);
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

  doExport() {
    this.Export.emit(this._statuszszempont);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

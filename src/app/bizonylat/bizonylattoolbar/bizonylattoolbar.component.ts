import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-bizonylattoolbar',
  templateUrl: './bizonylattoolbar.component.html'
})
export class BizonylattoolbarComponent implements AfterViewInit, OnDestroy {
  @Input() Megrendeles = false;

  @Input() MegrendelesSzurok: string[] = [];
  @Input() Szurok: string[] = [];

  @Input() enKereses = true;
  @Input() enUj = true;

  @Output() Kereses = new EventEmitter<void>();
  @Output() Uj = new EventEmitter<void>();

  // azért kell a kétirányú adatkötés, h a szülő komponens újrainicializálja a toolbart
  // pl. egy tétel szerkesztése után

  _megrendelesszempont = 0;
  _szempont = 0;

  @ViewChild('MegrendelesSzempont', {static: false}) MegrendelesSzempontCombobox: ElementRef;
  @Input()
  set megrendelesszempont(value: number) {
    this._megrendelesszempont = value;
  }
  @Output() megrendelesszempontChange: EventEmitter<number> = new EventEmitter();

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
    if (this.Megrendeles) {
      this.MegrendelesSzempontCombobox.nativeElement.addEventListener('change', (event) => {
        this._megrendelesszempont = event.target.value;
        this.megrendelesszempontChange.emit(this._megrendelesszempont);
      });
    }

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

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

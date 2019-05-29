import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-ugyfeltoolbar',
  templateUrl: './ugyfeltoolbar.component.html',
  styleUrls: ['./ugyfeltoolbar.component.css']
})
export class UgyfeltoolbarComponent implements AfterViewInit, OnDestroy {
  @Input() Csoportszurok: string[] = [];
  @Input() Szurok: string[] = [];

  @Input() enKereses = true;
  @Input() enUj = true;
  @Input() visUj = true;
  @Input() visZoom = false;

  @Output() Kereses = new EventEmitter<void>();
  @Output() Uj = new EventEmitter<void>();
  @Output() StopZoom = new EventEmitter<void>();

  // azért kell a kétirányú adatkötés, h a szülő komponens újrainicializálja a toolbart
  // pl. egy tétel szerkesztése után

  _csoportszempont = 0;
  _szempont = 0;

  @ViewChild('Csoportszempont') CsoportszempontCombobox: ElementRef;
  @Input()
  set csoportszempont(value: number) {
    this._csoportszempont = value;
  }
  @Output() csoportszempontChange: EventEmitter<number> = new EventEmitter();

  @ViewChild('Szempont') SzempontCombobox: ElementRef;
  @Input()
  set szempont(value: number) {
    this._szempont = value;
  }
  @Output() szempontChange: EventEmitter<number> = new EventEmitter();

  @ViewChild('Minta') MintaTextBox: ElementRef;
  @Input()
  set minta(value: string) {
    this.MintaTextBox.nativeElement.value = value;
  }
  @Output() mintaChange: EventEmitter<string> = new EventEmitter();

  ngAfterViewInit(): void {
    this.CsoportszempontCombobox.nativeElement.addEventListener('change', (event) => {
      this._csoportszempont = event.target.value;
      this.csoportszempontChange.emit(this._csoportszempont);
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

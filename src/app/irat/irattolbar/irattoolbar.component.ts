import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-irattoolbar',
  templateUrl: './irattoolbar.component.html'
})
export class IratToolbarComponent implements AfterViewInit, OnDestroy {
  @Input() szurok: string[] = [];
  @Input() szurok2: string[] = [];

  @Input() enKereses = true;
  @Input() enUj = true;

  @Output() Kereses = new EventEmitter<void>();
  @Output() Uj = new EventEmitter<void>();

  // azért kell a kétirányú adatkötés, h a szülő komponens újrainicializálja a toolbart
  // pl. egy tétel szerkesztése után

  _szempont = 0;
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


  _szempont2 = 0;
  @ViewChild('Szempont2', {static: true}) Szempont2Combobox: ElementRef;
  @Input()
  set szempont2(value: number) {
    this._szempont2 = value;
  }
  @Output() szempont2Change: EventEmitter<number> = new EventEmitter();


  @ViewChild('Minta2', {static: true}) Minta2TextBox: ElementRef;
  @Input()
  set minta2(value: string) {
    this.Minta2TextBox.nativeElement.value = value;
  }
  @Output() minta2Change: EventEmitter<string> = new EventEmitter();


  ngAfterViewInit(): void {
    this.SzempontCombobox.nativeElement.addEventListener('change', (event) => {
      this._szempont = event.target.value;
      this.szempontChange.emit(this._szempont);
    });
    this.MintaTextBox.nativeElement.addEventListener('keyup', () => {
      this.mintaChange.emit(this.MintaTextBox.nativeElement.value);
    });

    this.Szempont2Combobox.nativeElement.addEventListener('change', (event) => {
      this._szempont2 = event.target.value;
      this.szempont2Change.emit(this._szempont2);
    });
    this.Minta2TextBox.nativeElement.addEventListener('keyup', () => {
      this.minta2Change.emit(this.Minta2TextBox.nativeElement.value);
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

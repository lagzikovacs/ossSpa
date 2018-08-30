import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-projekttoolbar',
  templateUrl: './projekttoolbar.component.html',
  styleUrls: ['./projekttoolbar.component.css'],
})
export class ProjektToolbarComponent implements AfterViewInit {
  @Input() Statuszszurok: string[] = [];
  @Input() Teendoszurok: string[] = [];
  @Input() Szurok: string[] = [];

  @Input() enKereses = true;
  @Input() enUj = true;

  @Output() Kereses = new EventEmitter<void>();
  @Output() Uj = new EventEmitter<void>();

  // azért kell a kétirányú adatkötés, h a szülő komponens újrainicializálja a toolbart
  // pl. egy tétel szerkesztése után

  _statuszszempont = 0;
  _teendoszempont = 0;
  _szempont = 0;

  @ViewChild('Statuszszempont') StatuszszempontCombobox: ElementRef;
  @Input()
  set statuszszempont(value: number) {
    this._statuszszempont = value;
  }
  @Output() statuszszempontChange: EventEmitter<number> = new EventEmitter();

  @ViewChild('Teendoszempont') TeendoszempontCombobox: ElementRef;
  @Input()
  set teendoszempont(value: number) {
    this._teendoszempont = value;
  }
  @Output() teendoszempontChange: EventEmitter<number> = new EventEmitter();

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
}

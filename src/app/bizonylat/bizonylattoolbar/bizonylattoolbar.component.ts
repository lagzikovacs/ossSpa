import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-bizonylattoolbar',
  templateUrl: './bizonylattoolbar.component.html',
  styleUrls: ['./bizonylattoolbar.component.css']
})
export class BizonylattoolbarComponent implements AfterViewInit {
  @Input() Szurok: string[] = [];

  @Input() enKereses = true;
  @Input() enUj = true;

  @Output() Kereses = new EventEmitter<void>();
  @Output() Uj = new EventEmitter<void>();

  // azért kell a kétirányú adatkötés, h a szülő komponens újrainicializálja a toolbart
  // pl. egy tétel szerkesztése után

  _szempont = 0;

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

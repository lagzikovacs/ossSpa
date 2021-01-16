import {Component, ElementRef, Input, OnDestroy, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-bizonylat-zoom',
  templateUrl: './bizonylat-zoom.component.html'
})
export class BizonylatZoomComponent implements OnInit, OnDestroy {
  @ViewChild('Minta', {static: true}) MintaTextBox: ElementRef;
  eppFrissit = false;
  @Input() maszk: string;
  @Output() eventSelectzoom = new EventEmitter<void>();
  @Output() eventStopzoom = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    this.MintaTextBox.nativeElement.value = this.maszk;
    this.doKereses();
  }

  doKereses() {

  }

  doStopZoom() {
    this.eventStopzoom.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {UgyfelDto} from '../ugyfeldto';

@Component({
  selector: 'app-ugyfel-tabla',
  templateUrl: './ugyfel-tabla.component.html',
  styleUrls: ['./ugyfel-tabla.component.css']
})
export class UgyfelTablaComponent implements OnDestroy {
  @Input() items: UgyfelDto[];
  @Input() zoom = false;

  @Input() selectedrow: number;
  @Output() selectedrowChange = new EventEmitter<number>();

  @Output() forzoom = new EventEmitter<number>();
  @Output() forid = new EventEmitter<number>();

  clickforrow(i: number) {
    this.selectedrowChange.emit(i);
  }
  clickforzoom(i: number) {
    this.forzoom.emit(i);
  }
  clickforid(i: number) {
    this.forid.emit(i);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

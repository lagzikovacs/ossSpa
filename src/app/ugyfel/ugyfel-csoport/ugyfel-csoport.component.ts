import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-ugyfel-csoport',
  templateUrl: './ugyfel-csoport.component.html',
  styleUrls: ['./ugyfel-csoport.component.css']
})
export class UgyfelCsoportComponent implements OnDestroy {
  @Input() eppFrissit: boolean;
  @Input() selected = 0;
  @Output() OkClick = new EventEmitter<number>();
  @Output() CancelClick = new EventEmitter<void>();

  entries = ['(0) Mind', '(1) Kiemelt'];

  change(i) {
    this.selected = i;
  }

  okClick() {
    this.OkClick.emit(this.selected);
  }

  cancelClick() {
    this.CancelClick.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

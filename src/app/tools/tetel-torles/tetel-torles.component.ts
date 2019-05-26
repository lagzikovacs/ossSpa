import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';

@Component({
  selector: 'app-tetel-torles',
  templateUrl: './tetel-torles.component.html'
})
export class TetelTorlesComponent implements OnDestroy {
  @Input() cim: string;
  @Input() eppFrissit: boolean;
  @Output() OkClick = new EventEmitter<void>();
  @Output() CancelClick = new EventEmitter<void>();

  okClick() {
    this.OkClick.emit();
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

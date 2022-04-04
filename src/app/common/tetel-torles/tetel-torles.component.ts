import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tetel-torles',
  templateUrl: './tetel-torles.component.html'
})
export class TetelTorlesComponent implements OnDestroy {
  @Input() cim: string;
  @Output() eventTorles = new EventEmitter<boolean>();

  doOk() {
    this.eventTorles.emit(true);
  }

  doCancel() {
    this.eventTorles.emit(false);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

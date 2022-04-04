import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ColumnSettings} from './columnsettings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-reszletek',
  templateUrl: './reszletek.component.html'
})
export class ReszletekComponent implements OnDestroy {
  @Input() cim: string;
  @Input() item: any;
  @Input() colsets: ColumnSettings[];

  selectedindex: number;

  rowClick(i: number) {
    this.selectedindex = i;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

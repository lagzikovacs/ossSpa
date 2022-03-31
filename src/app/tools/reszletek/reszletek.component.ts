import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ColumnSettings} from './columnsettings';

@Component({
  selector: 'app-reszletek',
  templateUrl: './reszletek.component.html'
})
export class ReszletekComponent implements OnDestroy {
  @Input() cim: string;
  @Input() item: any;
  @Input() colsets: ColumnSettings[];

  @Input() selectedindex: number;
  @Output() selectedindexChange = new EventEmitter<number>();

  RowClick(i: number) {
    this.selectedindex = i;
    this.selectedindexChange.emit(i);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ColumnSettings} from '../reszletek/columnsettings';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnDestroy {
  @Input() items: any[];
  @Input() colsets: ColumnSettings[];
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

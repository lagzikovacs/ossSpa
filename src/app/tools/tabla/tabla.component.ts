import {Component, EventEmitter, Input, OnDestroy, Output, TemplateRef} from '@angular/core';
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

  @Input() egyTemplate: TemplateRef<any>;

  @Output() forzoom = new EventEmitter<number>();
  @Output() forid = new EventEmitter<number>();

  clickedrowindex = -1;
  clickedidindex = -1;

  clearselections() {
    this.clickedrowindex = -1;
    this.clickedidindex = -1;
  }

  clickforid(i: number) {
    this.clickedidindex = i;
    this.clickedrowindex = this.clickedidindex;

    this.forid.emit(this.clickedidindex);
  }

  clickforrow(i: number) {
    this.clickedrowindex = i;
    // először clickforid aztán clickforrow is, clickforrow felülírná DtoSelectedindex-et
    if (this.clickedrowindex !== this.clickedidindex) {
      this.clickedidindex = -1;
      this.forid.emit(-1);
    }
  }

  clickforzoom(i: number) {
    this.forzoom.emit(i);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
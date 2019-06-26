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
  @Input() letoltes = false;
  @Input() enIdclick = true;

  @Input() egyTemplate: TemplateRef<any>;

  @Output() fordownload = new EventEmitter<number>();
  @Output() forzoom = new EventEmitter<number>();
  @Output() forid = new EventEmitter<number>();

  clickedrowindex = -1;
  clickedidindex = -1;
  clickeddownloadindex = -1;

  clearselections() {
    this.clickedrowindex = -1;
    this.clickedidindex = -1;
  }

  clickfordownload(i: number) {
    this.clickeddownloadindex = i;
    this.clickedidindex = this.clickeddownloadindex;
    this.clickedrowindex = this.clickeddownloadindex;

    this.fordownload.emit(this.clickeddownloadindex);
  }

  clickforid(i: number) {
    this.clickedidindex = i;
    this.clickedrowindex = this.clickedidindex;
    this.clickeddownloadindex = this.clickedidindex;

    this.forid.emit(this.clickedidindex);
  }

  clickforrow(i: number) {
    this.clickedrowindex = i;
    // először clickforid vagy clickfordownload, aztán clickforrow is, clickforrow felülírná az eseményeket
    if (this.clickedrowindex !== this.clickedidindex && this.clickedrowindex !== this.clickeddownloadindex) {
      this.clickedidindex = -1;
      this.clickeddownloadindex = -1;
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

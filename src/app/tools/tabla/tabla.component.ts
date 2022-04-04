import {Component, EventEmitter, Input, OnDestroy, Output, TemplateRef} from '@angular/core';
import {ColumnSettings} from '../../common/reszletek/columnsettings';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html'
})
export class TablaComponent implements OnDestroy {
  @Input() items: any[];
  @Input() colsets: ColumnSettings[];
  @Input() zoom = false;
  @Input() letoltes = false;
  @Input() nezet = false;
  @Input() enIdclick = true;
  @Input() megjegyzesIs = false;

  @Input() ujTemplate: TemplateRef<any>;
  @Input() egyTemplate: TemplateRef<any>;

  @Output() fordownload = new EventEmitter<number>();
  @Output() forview = new EventEmitter<number>();
  @Output() forzoom = new EventEmitter<number>();
  @Output() forid = new EventEmitter<number>();

  clickedrowindex = -1;
  clickedidindex = -1;
  clickeddownloadindex = -1;
  ujtetel = false;

  clearselections() {
    this.ujtetel = false;

    this.clickedrowindex = -1;
    this.clickedidindex = -1;
  }

  ujtetelstart() {
    this.clearselections();

    this.ujtetel = true;
  }
  ujtetelstop() {
    this.ujtetel = false;
  }

  clickfordownload(i: number) {
    this.clickeddownloadindex = i;
    this.clickedidindex = this.clickeddownloadindex;
    this.clickedrowindex = this.clickeddownloadindex;

    this.fordownload.emit(this.clickeddownloadindex);
  }
  clickforview(i: number) {
    this.clickeddownloadindex = i;
    this.clickedidindex = this.clickeddownloadindex;
    this.clickedrowindex = this.clickeddownloadindex;

    this.forview.emit(this.clickeddownloadindex);
  }
  clickforid(i: number) {
    this.ujtetel = false;

    this.clickedidindex = i;
    this.clickedrowindex = this.clickedidindex;
    this.clickeddownloadindex = this.clickedidindex;

    this.forid.emit(this.clickedidindex);
  }

  clickforrow(i: number) {
    this.ujtetel = false;

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

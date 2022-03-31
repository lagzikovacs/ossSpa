import {Component, EventEmitter, Input, OnDestroy, Output, TemplateRef} from '@angular/core';
import {AjanlatBuf} from '../ajanlatbuf';

@Component({
  selector: 'app-ajanlat-tabla',
  templateUrl: './ajanlat-tabla.component.html'
})
export class AjanlatTablaComponent implements OnDestroy {
  @Input() items: AjanlatBuf[];
  @Output() forid = new EventEmitter<number>();

  @Input() tetelTemplate: TemplateRef<any>;

  szerkesztes = false;
  clickedrowindex = -1;
  clickedidindex = -1;

  clearselections() {
    this.clickedrowindex = -1;
    this.clickedidindex = -1;
  }

  nem() {
    this.szerkesztes = false;
  }

  clickforid(i: number) {
    this.szerkesztes = false;

    this.clickedidindex = i;
    this.clickedrowindex = this.clickedidindex;

    this.forid.emit(this.clickedidindex);
    this.szerkesztes = true;
  }

  clickforrow(i: number) {
    this.clickedrowindex = i;
    // először clickforid vagy clickfordownload, aztán clickforrow is, clickforrow felülírná az eseményeket
    if (this.clickedrowindex !== this.clickedidindex) {
      this.szerkesztes = false;
      this.clickedidindex = -1;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

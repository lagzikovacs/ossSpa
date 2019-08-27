import {Component, EventEmitter, Input, OnDestroy, Output, TemplateRef} from '@angular/core';
import {UgyfelkapcsolatDto} from '../ugyfelkapcsolatdto';

@Component({
  selector: 'app-ugyfelkapcsolat-tabla',
  templateUrl: './ugyfelkapcsolat-tabla.component.html',
  styleUrls: ['./ugyfelkapcsolat-tabla.component.css']
})
export class UgyfelkapcsolatTablaComponent implements OnDestroy {
  @Input() items: UgyfelkapcsolatDto[];

  @Input() ujTemplate: TemplateRef<any>;
  @Input() egyTemplate: TemplateRef<any>;

  @Output() forid = new EventEmitter<number>();

  clickedrowindex = -1;
  clickedidindex = -1;
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

  clickforid(i: number) {
    this.ujtetel = false;

    this.clickedidindex = i;
    this.clickedrowindex = this.clickedidindex;

    this.forid.emit(this.clickedidindex);
  }

  clickforrow(i: number) {
    this.ujtetel = false;

    this.clickedrowindex = i;
    // először clickforid aztán clickforrow is, clickforrow felülírná DtoSelectedindex-et
    if (this.clickedrowindex !== this.clickedidindex) {
      this.clickedidindex = -1;
      this.forid.emit(-1);
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

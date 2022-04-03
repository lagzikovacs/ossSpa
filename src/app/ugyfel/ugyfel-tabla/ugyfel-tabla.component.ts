import {Component, EventEmitter, Input, OnDestroy, Output, TemplateRef} from '@angular/core';
import {UgyfelDto} from '../../01 Torzsadatok/09 Ugyfel/ugyfeldto';

@Component({
  selector: 'app-ugyfel-tabla',
  templateUrl: './ugyfel-tabla.component.html'
})
export class UgyfelTablaComponent implements OnDestroy {
  @Input() items: UgyfelDto[];
  @Input() zoom = false;

  @Input() ujTemplate: TemplateRef<any>;
  @Input() egyTemplate: TemplateRef<any>;

  @Output() forzoom = new EventEmitter<number>();
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

  clickforzoom(i: number) {
    this.forzoom.emit(i);
  }


  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

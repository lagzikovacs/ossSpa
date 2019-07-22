import {Component, EventEmitter, Input, OnDestroy, Output, TemplateRef} from '@angular/core';
import {BizonylatKapcsolatDto} from '../bizonylatkapcsolatdto';

@Component({
  selector: 'app-bizonylatkapcsolat-tabla',
  templateUrl: './bizonylatkapcsolat-tabla.component.html',
  styleUrls: ['./bizonylatkapcsolat-tabla.component.css']
})
export class BizonylatkapcsolatTablaComponent implements OnDestroy {
  @Input() items: BizonylatKapcsolatDto[];

  @Input() egyIrat: TemplateRef<any>;
  @Input() egyLevalasztas: TemplateRef<any>;
  @Input() egyVagolaprol: TemplateRef<any>;
  @Input() egyUjirat: TemplateRef<any>;

  @Output() forid = new EventEmitter<number>();
  @Output() forlevalasztas = new EventEmitter<number>();

  @Input() iratOk = false;
  @Input() levalasztasOk = false;
  @Input() vagolaprolOk = false;
  @Input() ujiratOk = false;

  clickedrowindex = -1;
  clickedidindex = -1;

  clearselections() {
    this.clickedrowindex = -1;
    this.clickedidindex = -1;

    this.nemOk();
  }

  nemOk() {
    this.iratOk = false;
    this.levalasztasOk = false;
    this.vagolaprolOk = false;
    this.ujiratOk = false;
  }

  clickforid(i: number) {
    this.nemOk();

    this.clickedidindex = i;
    this.clickedrowindex = this.clickedidindex;

    this.forid.emit(this.clickedidindex);
  }

  clickforrow(i: number) {
    this.clickedrowindex = i;
    // először clickforid aztán clickforrow is, clickforrow felülírná az eseményeket
    if (this.clickedrowindex !== this.clickedidindex) {
      this.nemOk();
      this.clickedidindex = -1;
      this.forid.emit(-1);
    }
  }

  clickforlevalasztas(i: number) {
    this.nemOk();

    this.clickedidindex = i;
    this.forlevalasztas.emit(i);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

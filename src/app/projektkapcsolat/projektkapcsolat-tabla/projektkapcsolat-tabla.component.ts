import {Component, EventEmitter, Input, OnDestroy, Output, TemplateRef} from '@angular/core';
import {ProjektKapcsolatDto} from '../projektkapcsolatdto';

@Component({
  selector: 'app-projektkapcsolat-tabla',
  templateUrl: './projektkapcsolat-tabla.component.html',
  styleUrls: ['./projektkapcsolat-tabla.component.css']
})
export class ProjektkapcsolatTablaComponent implements OnDestroy {
  @Input() items: ProjektKapcsolatDto[];

  @Input() egyBizonylat: TemplateRef<any>;
  @Input() egyIrat: TemplateRef<any>;
  @Input() egyLevalasztas: TemplateRef<any>;
  @Input() egyVagolaprol: TemplateRef<any>;
  @Input() egyUjbizonylat: TemplateRef<any>;
  @Input() egyUjirat: TemplateRef<any>;

  @Output() forid = new EventEmitter<number>();
  @Output() forlevalasztas = new EventEmitter<number>();

  @Input() bizonylatOk = false;
  @Input() iratOk = false;
  @Input() levalasztasOk = false;
  @Input() vagolaprolOk = false;
  @Input() ujbizonylatOk = false;
  @Input() ujiratOk = false;

  clickedrowindex = -1;
  clickedidindex = -1;

  clearselections() {
    this.clickedrowindex = -1;
    this.clickedidindex = -1;

    this.nemOk();
  }

  nemOk() {
    this.bizonylatOk = false;
    this.iratOk = false;
    this.levalasztasOk = false;
    this.vagolaprolOk = false;
    this.ujbizonylatOk = false;
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

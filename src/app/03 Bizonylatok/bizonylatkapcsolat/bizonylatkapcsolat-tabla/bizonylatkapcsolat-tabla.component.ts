import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output,
  TemplateRef
} from '@angular/core';
import {BizonylatKapcsolatDto} from '../bizonylatkapcsolatdto';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylatkapcsolat-tabla',
  templateUrl: './bizonylatkapcsolat-tabla.component.html'
})
export class BizonylatkapcsolatTablaComponent implements OnDestroy {
  @Input() items: BizonylatKapcsolatDto[];
  @Input() egyOk = false;
  @Input() egyKapcsolat: TemplateRef<any>;
  @Output() forid = new EventEmitter<number>();

  clickedrowindex = -1;
  clickedidindex = -1;

  constructor(private _cdr: ChangeDetectorRef) {
  }

  clearselections() {
    this.clickedrowindex = -1;
    this.clickedidindex = -1;

    this.egyOk = false;

    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  egytetelstart() {
    this.egyOk = true;

    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  clickforid(i: number) {
    this.clickedidindex = i;
    this.clickedrowindex = this.clickedidindex;

    this.forid.emit(this.clickedidindex);
  }

  clickforrow(i: number) {
    this.clickedrowindex = i;
    // először clickforid aztán clickforrow is, clickforrow felülírná az eseményeket
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

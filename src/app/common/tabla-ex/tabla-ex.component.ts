import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output,
  TemplateRef
} from '@angular/core';
import {ColumnSettings} from '../reszletek/columnsettings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tabla-ex',
  templateUrl: './tabla-ex.component.html'
})
export class TablaExComponent implements OnDestroy {
  @Input() items: any[];
  @Input() colsets: ColumnSettings[];
  @Input() zoom = false;
  @Input() enIdclick = true;
  @Input() megjegyzesIs = false;

  @Input() egyTemplate: TemplateRef<any>;

  @Output() forzoom = new EventEmitter<number>();
  @Output() forid = new EventEmitter<number>();

  clickedrowindex = -1;
  clickedidindex = -1;
  ujtetel = false;
  egytetel = false;

  constructor(private _cdr: ChangeDetectorRef) {
  }

  clearselections() {
    this.ujtetel = false;
    this.egytetel = false;

    this.clickedrowindex = -1;
    this.clickedidindex = -1;

    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  ujtetelstart() {
    this.clearselections();
    this.ujtetel = true;

    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }
  ujtetelstop() {
    this.ujtetel = false;

    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  egytetelstart() {
    this.egytetel = true;

    this._cdr.markForCheck();
    this._cdr.detectChanges();
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
    // először clickforid aztán clickforrow is, clickforrow felülírná az eseményeket
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

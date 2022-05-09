import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output,
  TemplateRef
} from '@angular/core';
import {ProjektKapcsolatDto} from '../projektkapcsolatdto';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projektkapcsolat-tabla',
  templateUrl: './projektkapcsolat-tabla.component.html'
})
export class ProjektkapcsolatTablaComponent implements OnDestroy {
  @Input() items: ProjektKapcsolatDto[];

  @Input() egyKapcsolat: TemplateRef<any>;
  @Input() ujOk = false;
  @Input() egyOk = false;

  @Output() forid = new EventEmitter<number>();

  clickedrowindex = -1;
  clickedidindex = -1;

  constructor(private _cdr: ChangeDetectorRef) {
  }

  clearselections() {
    this.clickedrowindex = -1;
    this.clickedidindex = -1;

    this.ujOk = false;
    this.egyOk = false;

    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  ujtetelstart() {
    this.clearselections();
    this.ujOk = true;

    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }
  ujtetelstop() {
    this.ujOk = false;

    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  egytetelstart() {
    this.egyOk = true;

    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  clickforid(i: number) {
    this.ujOk = false;

    this.clickedidindex = i;
    this.clickedrowindex = this.clickedidindex;

    this.forid.emit(this.clickedidindex);
  }

  clickforrow(i: number) {
    this.ujOk = false;

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

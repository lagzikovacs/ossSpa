import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  TemplateRef
} from '@angular/core';
import {BizonylatDto} from '../bizonylatdto';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylattabla',
  templateUrl: './bizonylattabla.component.html'
})
export class BizonylattablaComponent implements AfterViewInit, OnDestroy {
  @Input() items = new Array<BizonylatDto>();
  @Input() enIdclick = true;

  @Input() ujTemplate: TemplateRef<any>;
  @Input() egyTemplate: TemplateRef<any>;

  @Output() forid = new EventEmitter<number>();

  clickedrowindex = -1;
  clickedidindex = -1;
  ujtetel = false;

  constructor(private _cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {

  }

  clearselections() {
    this.ujtetel = false;

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

  clickforid(i: number) {
    this.ujtetel = false;

    this.clickedidindex = i;
    this.clickedrowindex = this.clickedidindex;

    this.forid.emit(this.clickedidindex);
  }

  clickforrow(i: number) {
    this.ujtetel = false;

    this.clickedrowindex = i;
    // először clickforid vagy clickfordownload, aztán clickforrow is, clickforrow felülírná az eseményeket
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

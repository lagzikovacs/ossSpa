import {Component, EventEmitter, Input, OnDestroy, Output, TemplateRef} from '@angular/core';
import {BizonylatDto} from '../bizonylatdto';

@Component({
  selector: 'app-bizonylattabla',
  templateUrl: './bizonylattabla.component.html',
  styleUrls: ['./bizonylattabla.component.css']
})
export class BizonylattablaComponent implements OnDestroy {
  @Input() items: BizonylatDto[] = new Array<BizonylatDto>();
  @Input() enIdclick = true;

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

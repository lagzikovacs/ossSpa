import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {BizonylatKapcsolatDto} from '../../../03 Bizonylatok/bizonylatkapcsolat/bizonylatkapcsolatdto';

@Component({
  selector: 'app-ugyfelter-bizonylatesirat',
  templateUrl: './ugyfelter-bizonylatesirat.component.html'
})
export class UgyfelterBizonylatesiratComponent implements OnDestroy {
  @Input() Dto: BizonylatKapcsolatDto[];
  @Output() bizonylatclick = new EventEmitter<number>();
  @Output() iratclick = new EventEmitter<number>();

  bizonylatvalasztas(i: number) {
    this.bizonylatclick.emit(i);
  }

  iratvalasztas(i: number) {
    this.iratclick.emit(i);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

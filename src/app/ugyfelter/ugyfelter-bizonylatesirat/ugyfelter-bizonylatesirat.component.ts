import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {BizonylatKapcsolatDto} from '../../bizonylatkapcsolat/bizonylatkapcsolatdto';

@Component({
  selector: 'app-ugyfelter-bizonylatesirat',
  templateUrl: './ugyfelter-bizonylatesirat.component.html',
  styleUrls: ['./ugyfelter-bizonylatesirat.component.css']
})
export class UgyfelterBizonylatesiratComponent implements OnDestroy {
  eppFrissit = false;
  @Input() Dto: BizonylatKapcsolatDto[];
  @Output() bizonylatclick = new EventEmitter<number>();
  @Output() iratclick = new EventEmitter<number>();

  constructor() {
  }

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

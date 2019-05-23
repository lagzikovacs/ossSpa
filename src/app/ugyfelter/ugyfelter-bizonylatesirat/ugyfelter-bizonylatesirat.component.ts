import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ProjektkapcsolatService} from '../../projekt/bizonylatesirat/projektkapcsolat.service';
import {BizonylatService} from '../../bizonylat/bizonylat.service';
import {BizonylatnyomtatasService} from '../../bizonylat/bizonylatnyomtatas.service';
import {BizonylatKapcsolatDto} from '../../bizonylat/bizonylatirat/bizonylatkapcsolatdto';

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

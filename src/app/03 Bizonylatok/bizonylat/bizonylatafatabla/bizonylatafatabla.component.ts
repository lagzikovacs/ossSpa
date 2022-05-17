import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {BizonylatAfaDto} from '../bizonylatafadto';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylatafatabla',
  templateUrl: './bizonylatafatabla.component.html'
})
export class BizonylatafatablaComponent implements OnDestroy {
  @Input() Dto: BizonylatAfaDto[] = new Array<BizonylatAfaDto>();
  @Input() enIdclick = true;
  @Output() idclick = new EventEmitter<number>();

  setClickedRow(i: number) {
    this.idclick.emit(i);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

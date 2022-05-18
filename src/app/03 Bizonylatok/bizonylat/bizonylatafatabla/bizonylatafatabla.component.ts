import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy,
  Output
} from '@angular/core';
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

  clickedrowindex = -1;

  constructor(private _cdr: ChangeDetectorRef) {
  }

  clickforrow(i: number) {
    this.clickedrowindex = i;
  }

  clickforid(i: number) {
    this.idclick.emit(i);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

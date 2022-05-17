import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {BizonylatTermekdijDto} from '../bizonylattermekdijdto';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylattermekdijtabla',
  templateUrl: './bizonylattermekdijtabla.component.html'
})
export class BizonylattermekdijtablaComponent implements OnDestroy {
  @Input() Dto: BizonylatTermekdijDto[] = new Array<BizonylatTermekdijDto>();
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

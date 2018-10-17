import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {BizonylatDto} from '../bizonylatdto';

@Component({
  selector: 'app-bizonylattabla',
  templateUrl: './bizonylattabla.component.html',
  styleUrls: ['./bizonylattabla.component.css']
})
export class BizonylattablaComponent implements OnDestroy {
  @Input() Dto: BizonylatDto[] = new Array<BizonylatDto>();
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

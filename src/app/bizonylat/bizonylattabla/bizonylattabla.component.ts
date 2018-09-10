import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BizonylatDto} from '../bizonylatdto';

@Component({
  selector: 'app-bizonylattabla',
  templateUrl: './bizonylattabla.component.html',
  styleUrls: ['./bizonylattabla.component.css']
})
export class BizonylattablaComponent {
  @Input() Dto: BizonylatDto[] = new Array<BizonylatDto>();
  @Input() enIdclick = true;
  @Output() idclick = new EventEmitter<number>();

  setClickedRow(i: number) {
    this.idclick.emit(i);
  }
}

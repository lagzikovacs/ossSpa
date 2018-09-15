import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BizonylatTetelDto} from '../bizonylatteteldto';

@Component({
  selector: 'app-bizonylatteteltabla',
  templateUrl: './bizonylatteteltabla.component.html',
  styleUrls: ['./bizonylatteteltabla.component.css']
})
export class BizonylatteteltablaComponent {
  @Input() Dto: BizonylatTetelDto[] = new Array<BizonylatTetelDto>();
  @Input() enIdclick = true;
  @Output() idclick = new EventEmitter<number>();

  setClickedRow(i: number) {
    this.idclick.emit(i);
  }
}

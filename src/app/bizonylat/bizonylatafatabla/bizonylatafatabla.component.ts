import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BizonylatAfaDto} from '../bizonylatafadto';

@Component({
  selector: 'app-bizonylatafatabla',
  templateUrl: './bizonylatafatabla.component.html',
  styleUrls: ['./bizonylatafatabla.component.css']
})
export class BizonylatafatablaComponent {
  @Input() Dto: BizonylatAfaDto[] = new Array<BizonylatAfaDto>();
  @Input() enIdclick = true;
  @Output() idclick = new EventEmitter<number>();

  setClickedRow(i: number) {
    this.idclick.emit(i);
  }
}

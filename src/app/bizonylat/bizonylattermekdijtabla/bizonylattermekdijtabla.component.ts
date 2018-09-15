import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BizonylatTermekdijDto} from '../bizonylattermekdijdto';

@Component({
  selector: 'app-bizonylattermekdijtabla',
  templateUrl: './bizonylattermekdijtabla.component.html',
  styleUrls: ['./bizonylattermekdijtabla.component.css']
})
export class BizonylattermekdijtablaComponent {
  @Input() Dto: BizonylatTermekdijDto[] = new Array<BizonylatTermekdijDto>();
  @Input() enIdclick = true;
  @Output() idclick = new EventEmitter<number>();

  setClickedRow(i: number) {
    this.idclick.emit(i);
  }
}

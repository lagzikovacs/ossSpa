import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BizonylatTetelDto} from '../bizonylatteteldto';

@Component({
  selector: 'app-bizonylatteteltabla',
  templateUrl: './bizonylatteteltabla.component.html',
  styleUrls: ['./bizonylatteteltabla.component.css']
})
export class BizonylatteteltablaComponent {
  @Input() Dto: BizonylatTetelDto[] = new Array<BizonylatTetelDto>();
  @Input() enEdit = false;
  @Output() torles = new EventEmitter<number>();
  @Output() modositas = new EventEmitter<number>();

  dotorles(i: number) {
    this.torles.emit(i);
  }
  domodositas(i: number) {
    this.modositas.emit(i);
  }
}

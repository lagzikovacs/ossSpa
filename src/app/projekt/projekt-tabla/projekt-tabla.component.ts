import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProjektDto} from '../../dtos/projekt/projektdto';

@Component({
  selector: 'app-projekt-tabla',
  templateUrl: './projekt-tabla.component.html',
  styleUrls: ['./projekt-tabla.component.css']
})
export class ProjektTablaComponent {
  @Input() Dto: ProjektDto[] = new Array<ProjektDto>();
  @Input() enIdclick = true;
  @Output() idclick = new EventEmitter<number>();

  setClickedRow(i: number) {
    this.idclick.emit(i);
  }
}

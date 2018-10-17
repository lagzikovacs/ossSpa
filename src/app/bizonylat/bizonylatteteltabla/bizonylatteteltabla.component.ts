import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {BizonylatTetelDto} from '../bizonylatteteldto';

@Component({
  selector: 'app-bizonylatteteltabla',
  templateUrl: './bizonylatteteltabla.component.html',
  styleUrls: ['./bizonylatteteltabla.component.css']
})
export class BizonylatteteltablaComponent implements OnDestroy {
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

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

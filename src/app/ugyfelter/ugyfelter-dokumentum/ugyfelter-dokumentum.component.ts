import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {DokumentumDto} from '../../dokumentum/dokumentumdto';

@Component({
  selector: 'app-ugyfelter-dokumentum',
  templateUrl: './ugyfelter-dokumentum.component.html'
})
export class UgyfelterDokumentumComponent implements OnDestroy {
  @Input() Dto: DokumentumDto[];
  @Output() dokumentumclick = new EventEmitter<number>();

  dokumentumvalasztas(i: number) {
    this.dokumentumclick.emit(i);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

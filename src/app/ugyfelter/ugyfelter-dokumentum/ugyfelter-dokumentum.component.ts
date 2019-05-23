import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DokumentumDto} from '../../irat/dokumentum/dokumentumdto';

@Component({
  selector: 'app-ugyfelter-dokumentum',
  templateUrl: './ugyfelter-dokumentum.component.html',
  styleUrls: ['./ugyfelter-dokumentum.component.css']
})
export class UgyfelterDokumentumComponent implements OnDestroy {
  eppFrissit = false;
  @Input() Dto: DokumentumDto[];
  @Output() dokumentumclick = new EventEmitter<number>();

  constructor() {
  }

  dokumentumvalasztas(i: number) {
    this.dokumentumclick.emit(this.Dto[i].Dokumentumkod);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

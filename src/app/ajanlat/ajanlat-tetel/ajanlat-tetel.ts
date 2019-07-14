import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {AjanlatSzerkesztesMode} from '../ajanlatszerkesztesmode';
import {CikkDto} from '../../cikk/cikkdto';
import {AjanlatBuf} from '../ajanlatbuf';

@Component({
  selector: 'app-ajanlat-tetel',
  templateUrl: './ajanlat-tetel.html'
})
export class AjanlatTetelComponent implements OnDestroy {
  @Input() item: AjanlatBuf;
  @Output() eventTetelKesz = new EventEmitter<AjanlatBuf>();

  AjanlatSzerkesztesMode = AjanlatSzerkesztesMode.Blank;

  CikkZoom() {
    this.AjanlatSzerkesztesMode = AjanlatSzerkesztesMode.CikkZoom;
  }
  onCikkSelectzoom(Dto: CikkDto) {
    this.item.CikkKod = Dto.Cikkkod;
    this.item.CikkNev = Dto.Megnevezes;
    this.item.AfaMerteke = Dto.Afamerteke;
    this.item.EgysegAr = Dto.Egysegar;
  }
  onCikkStopzoom() {
    this.AjanlatSzerkesztesMode = AjanlatSzerkesztesMode.Blank;
  }

  onSubmit() {
    this.eventTetelKesz.emit(this.item);
  }
  cancel() {
    this.eventTetelKesz.emit(null);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

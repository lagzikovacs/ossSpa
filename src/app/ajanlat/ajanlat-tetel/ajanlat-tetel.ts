import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AjanlatSzerkesztesMode} from '../ajanlatszerkesztesmode';
import {CikkDto} from '../../cikk/cikkdto';
import {AjanlatBuf} from '../ajanlatbuf';

@Component({
  selector: 'app-ajanlat-tetel',
  templateUrl: './ajanlat-tetel.html'
})
export class AjanlatTetelComponent implements OnInit, OnDestroy {
  @Input() item: AjanlatBuf;
  @Output() eventTetelKesz = new EventEmitter<AjanlatBuf>();

  ajanlatzoombox: any;

  AjanlatSzerkesztesMode = AjanlatSzerkesztesMode.Blank;

  ngOnInit() {
    this.ajanlatzoombox = document.getElementById('ajanlatzoombox');
  }

  CikkZoom() {
    this.AjanlatSzerkesztesMode = AjanlatSzerkesztesMode.CikkZoom;
    this.ajanlatzoombox.style.display = 'block';
  }
  onCikkSelectzoom(Dto: CikkDto) {
    this.item.CikkKod = Dto.Cikkkod;
    this.item.CikkNev = Dto.Megnevezes;
    this.item.AfaMerteke = Dto.Afamerteke;
    this.item.EgysegAr = Dto.Egysegar;
    this.ajanlatzoombox.style.display = 'none';
  }
  onCikkStopzoom() {
    this.AjanlatSzerkesztesMode = AjanlatSzerkesztesMode.Blank;
    this.ajanlatzoombox.style.display = 'none';
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

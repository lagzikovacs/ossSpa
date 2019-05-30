import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {UgyfelDto} from '../ugyfeldto';

@Component({
  selector: 'app-ugyfel-vcard',
  templateUrl: './ugyfel-vcard.component.html',
  styleUrls: ['./ugyfel-vcard.component.css']
})
export class UgyfelVcardComponent implements OnDestroy {
  @Input() item: UgyfelDto;
  @Input() eppFrissit: boolean;
  @Output() LetoltesClick = new EventEmitter<void>();

  letoltesClick() {
    this.LetoltesClick.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

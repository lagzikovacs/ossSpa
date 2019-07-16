import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ParticioDto} from '../particiodto';

@Component({
  selector: 'app-particio-nav',
  templateUrl: './particio-nav.component.html'
})
export class ParticioNavComponent implements OnDestroy {
  @Input() Dto: ParticioDto;
  @Input() eppFrissit: boolean;
  @Output() eventOk = new EventEmitter<ParticioDto>();
  @Output() eventCancel = new EventEmitter<void>();

  onSubmit() {
    this.eventOk.emit(this.Dto);
  }
  cancel() {
    this.eventCancel.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

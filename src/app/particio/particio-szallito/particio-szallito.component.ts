import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ParticioDto} from '../particiodto';

@Component({
  selector: 'app-particio-szallito',
  templateUrl: './particio-szallito.component.html'
})
export class ParticioSzallitoComponent implements OnDestroy {
  @Input() Dto: ParticioDto;
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

import {Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {ParticioDto} from '../particiodto';

@Component({
  selector: 'app-particio-bizonylat',
  templateUrl: './particio-bizonylat.component.html'
})
export class ParticioBizonylatComponent implements OnDestroy {
  @Input() Dto: ParticioDto;
  @Input() eppFrissit: boolean;
  @Output() eventOk = new EventEmitter<ParticioDto>();
  @Output() eventCancel = new EventEmitter<void>();

  onSubmit() {
    this.eventOk.emit(this.Dto);
  }
  onCancel() {
    this.eventCancel.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

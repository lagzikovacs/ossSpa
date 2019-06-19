import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ParticioDto} from '../particiodto';

@Component({
  selector: 'app-particio-volume',
  templateUrl: './particio-volume.component.html'
})
export class ParticioVolumeComponent implements OnDestroy {
  @Input() Dto: ParticioDto;
  @Input() eppFrissit: boolean;
  @Output() OkClick = new EventEmitter<ParticioDto>();
  @Output() CancelClick = new EventEmitter<void>();

  onSubmit() {
    this.OkClick.emit(this.Dto);
  }
  cancel() {
    this.CancelClick.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

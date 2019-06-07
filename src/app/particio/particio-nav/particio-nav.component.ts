import {Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {ParticioDto} from '../particiodto';

@Component({
  selector: 'app-particio-nav',
  templateUrl: './particio-nav.component.html'
})
export class ParticioNavComponent implements OnDestroy {
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

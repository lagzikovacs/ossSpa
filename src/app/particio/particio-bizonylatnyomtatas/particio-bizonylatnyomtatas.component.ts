import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ParticioDto} from '../particiodto';
import {BizonylatConf} from '../bizonylatconf';

@Component({
  selector: 'app-particio-bizonylatnyomtatas',
  templateUrl: './particio-bizonylatnyomtatas.component.html'
})
export class ParticioBizonylatComponent implements OnInit, OnDestroy {
  @Input() Dto: ParticioDto;
  @Output() eventOk = new EventEmitter<ParticioDto>();
  @Output() eventCancel = new EventEmitter<void>();

  cBizonylat: BizonylatConf;

  ngOnInit() {
    try {
      this.cBizonylat = JSON.parse(this.Dto.Bizonylat); // kivétel, ha hibás
      if (this.cBizonylat === null) { // null, ha a mező is null
        throw new Error();
      }
    } catch (ex) {
      this.cBizonylat = new BizonylatConf();
    }
  }

  onSubmit() {
    this.Dto.Bizonylat = JSON.stringify(this.cBizonylat);

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

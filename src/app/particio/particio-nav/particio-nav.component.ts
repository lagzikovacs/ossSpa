import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ParticioDto} from '../particiodto';
import {NavOnlineszamlaConf} from '../navonlineszamlaconf';

@Component({
  selector: 'app-particio-nav',
  templateUrl: './particio-nav.component.html'
})
export class ParticioNavComponent implements OnInit, OnDestroy {
  @Input() Dto: ParticioDto;
  @Output() eventOk = new EventEmitter<ParticioDto>();
  @Output() eventCancel = new EventEmitter<void>();

  cNavOnlineszamla: NavOnlineszamlaConf;

  ngOnInit() {
    try {
      this.cNavOnlineszamla = JSON.parse(this.Dto.Navonlineszamla); // kivétel, ha hibás
      if (this.cNavOnlineszamla === null) { // null, ha a mező is null
        throw new Error();
      }
    } catch (ex) {
      this.cNavOnlineszamla = new NavOnlineszamlaConf();
    }
  }

  onSubmit() {
    this.Dto.Navonlineszamla = JSON.stringify(this.cNavOnlineszamla);

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

import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ParticioDto} from '../particiodto';
import {SzallitoConf} from '../szallitoconf';

@Component({
  selector: 'app-particio-kibocsato',
  templateUrl: './particio-kibocsato.component.html'
})
export class ParticioSzallitoComponent implements OnInit, OnDestroy {
  @Input() Dto: ParticioDto;
  @Output() eventOk = new EventEmitter<ParticioDto>();
  @Output() eventCancel = new EventEmitter<void>();

  cSzallito: SzallitoConf;

  ngOnInit() {
    try {
      this.cSzallito = JSON.parse(this.Dto.Szallito); // kivétel, ha hibás
      if (this.cSzallito === null) { // null, ha a mező is null
        throw new Error();
      }
    } catch (ex) {
      this.cSzallito = new SzallitoConf();
    }
  }

  onSubmit() {
    this.Dto.Szallito = JSON.stringify(this.cSzallito);

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

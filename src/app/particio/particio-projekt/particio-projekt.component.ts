import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ParticioDto} from '../particiodto';
import {ProjektConf} from '../projektconf';

@Component({
  selector: 'app-particio-projekt',
  templateUrl: './particio-projekt.component.html'
})
export class ParticioProjektComponent implements OnInit, OnDestroy {
  @Input() Dto: ParticioDto;
  @Output() eventOk = new EventEmitter<ParticioDto>();
  @Output() eventCancel = new EventEmitter<void>();

  cProjekt: ProjektConf;

  ngOnInit() {
    try {
      this.cProjekt = JSON.parse(this.Dto.Projekt); // kivétel, ha hibás
      if (this.cProjekt === null) { // null, ha a mező is null
        throw new Error();
      }
    } catch (ex) {
      this.cProjekt = new ProjektConf();
    }
  }

  onSubmit() {
    this.Dto.Projekt = JSON.stringify(this.cProjekt);

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

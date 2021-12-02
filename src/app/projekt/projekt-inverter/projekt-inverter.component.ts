import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {rowanimation} from '../../animation/rowAnimation';
import {deepCopy} from '../../tools/deepCopy';
import {ProjektDto} from '../projektdto';

@Component({
  selector: 'app-projekt-inverter',
  templateUrl: './projekt-inverter.component.html',
  animations: [rowanimation]
})
export class ProjektInverterComponent implements OnDestroy {
  @Input() eppFrissit: boolean;
  DtoEdited = new ProjektDto();
  @Input() set DtoOriginal(value: ProjektDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventOk = new EventEmitter<ProjektDto>();
  @Output() eventCancel = new EventEmitter<void>();

  projektservice: ProjektService;

  constructor(projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  onSubmit() {
    this.eventOk.emit(this.DtoEdited);
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

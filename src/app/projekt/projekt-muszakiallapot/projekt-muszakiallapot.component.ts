import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {rowanimation} from '../../animation/rowAnimation';
import {deepCopy} from '../../tools/deepCopy';
import {ProjektDto} from '../projektdto';

@Component({
  selector: 'app-projekt-muszakiallapot',
  templateUrl: './projekt-muszakiallapot.component.html',
  animations: [rowanimation]
})
export class ProjektMuszakiallapotComponent implements OnDestroy {
  @Input() eppFrissit: boolean;
  DtoEdited = new ProjektDto();
  @Input() set DtoOriginal(value: ProjektDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventOk = new EventEmitter<ProjektDto>();
  @Output() eventCancel = new EventEmitter<void>();

  entries = ['', 'Nincs elkezdve a kivitelezése', 'Elkezdve a kivitelezése', 'Beüzemelve, hiányos', 'Beüzemelve, átadva'];

  onSubmit() {
    this.eventOk.emit(this.DtoEdited);

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

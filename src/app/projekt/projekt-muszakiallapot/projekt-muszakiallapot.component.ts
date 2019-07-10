import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {rowanimation} from '../../animation/rowAnimation';
import {deepCopy} from '../../tools/deepCopy';
import {ProjektDto} from '../projektdto';

@Component({
  selector: 'app-projekt-muszakiallapot',
  templateUrl: './projekt-muszakiallapot.component.html',
  animations: [rowanimation]
})
export class ProjektMuszakiallapotComponent implements OnInit, OnDestroy {
  @Input() eppFrissit: boolean;
  DtoEdited = new ProjektDto();
  @Input() set DtoOriginal(value: ProjektDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() OkClick = new EventEmitter<ProjektDto>();
  @Output() CancelClick = new EventEmitter<void>();

  entries = ['', 'Nincs elkezdve a kivitelezése', 'Elkezdve a kivitelezése', 'Beüzemelve, hiányos', 'Beüzemelve, átadva'];
  selected = '';

  projektservice: ProjektService;

  constructor(projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  ngOnInit() {
    this.selected = this.DtoEdited.Muszakiallapot || '';
  }

  change(entry) {
    this.selected = entry;
  }

  onSubmit() {
    this.DtoEdited.Muszakiallapot = this.selected;

    this.OkClick.emit(this.DtoEdited);

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

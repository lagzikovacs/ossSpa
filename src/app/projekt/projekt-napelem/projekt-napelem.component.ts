import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {rowanimation} from '../../animation/rowAnimation';
import {ProjektDto} from '../projektdto';
import {deepCopy} from '../../tools/deepCopy';

@Component({
  selector: 'app-projekt-napelem',
  templateUrl: './projekt-napelem.component.html',
  animations: [rowanimation]
})
export class ProjektNapelemComponent implements OnInit, OnDestroy {
  @Input() eppFrissit: boolean;
  DtoEdited = new ProjektDto();
  @Input() set DtoOriginal(value: ProjektDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() OkClick = new EventEmitter<ProjektDto>();
  @Output() CancelClick = new EventEmitter<void>();

  entries = ['', 'Nincs megrendelve', 'Megrendelve', 'Raktárban', 'Kiszállítva/telepítve', 'Harmadik fél biztosítja'];
  selected = '';

  projektservice: ProjektService;

  constructor(projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  ngOnInit() {
    this.selected = this.DtoEdited.Napelemallapot || '';
  }

  change(entry) {
    this.selected = entry;
  }

  onSubmit() {
    this.DtoEdited.Napelemallapot = this.selected;

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

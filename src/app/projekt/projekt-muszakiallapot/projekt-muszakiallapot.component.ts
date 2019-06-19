import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-projekt-muszakiallapot',
  templateUrl: './projekt-muszakiallapot.component.html',
  animations: [rowanimation]
})
export class ProjektMuszakiallapotComponent implements OnInit, OnDestroy {
  projektservice: ProjektService;

  entries = ['', 'Nincs elkezdve a kivitelezése', 'Elkezdve a kivitelezése', 'Beüzemelve, hiányos', 'Beüzemelve, átadva'];
  selected = '';
  @Input() eppFrissit: boolean;

  @Output() OkClick = new EventEmitter<void>();
  @Output() CancelClick = new EventEmitter<void>();

  constructor(projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  ngOnInit() {
    this.selected = this.projektservice.DtoEdited.Muszakiallapot || '';
  }

  change(entry) {
    this.selected = entry;
  }

  onSubmit() {
    this.projektservice.DtoEdited.Muszakiallapot = this.selected;

    this.OkClick.emit();

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

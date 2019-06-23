import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-projekt-napelem',
  templateUrl: './projekt-napelem.component.html',
  animations: [rowanimation]
})
export class ProjektNapelemComponent implements OnInit, OnDestroy {
  projektservice: ProjektService;

  entries = ['', 'Nincs megrendelve', 'Megrendelve', 'Raktárban', 'Kiszállítva/telepítve', 'Harmadik fél biztosítja'];
  selected = '';
  @Input() eppFrissit: boolean;

  @Output() OkClick = new EventEmitter<void>();
  @Output() CancelClick = new EventEmitter<void>();

  constructor(projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  ngOnInit() {
    this.selected = this.projektservice.DtoEdited.Napelemallapot || '';
  }

  change(entry) {
    this.selected = entry;
  }

  onSubmit() {
    this.projektservice.DtoEdited.Napelemallapot = this.selected;

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
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {ProjektEgyMode} from '../projektegymode';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-projekt-inverter',
  templateUrl: './projekt-inverter.component.html',
  animations: [rowanimation]
})
export class ProjektInverterComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

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
    this.selected = this.projektservice.DtoEdited.Inverterallapot || '';
  }

  change(entry) {
    this.selected = entry;
  }

  onSubmit() {
    this.projektservice.DtoEdited.Inverterallapot = this.selected;

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

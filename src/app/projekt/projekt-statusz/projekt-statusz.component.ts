import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-projekt-statusz',
  templateUrl: './projekt-statusz.component.html',
  animations: [rowanimation]
})
export class ProjektStatuszComponent implements OnInit, OnDestroy {
  projektservice: ProjektService;

  entries = ['(0) Mind', '(1) Ajánlat', '(2) Fut', '(3) Kész', '(4) Pályázatra vár', '(5) Mástól megrendelte', '(6) Döglött',
    '(7) Csak érdeklődött', '(8) Helyszíni felmérést kér', '(9) Kommunikál, van remény', '(10) Még papírozni kell',
    '(11) Elhalasztva', '(12) Passzív', '(13) Felmérés után', '(14) Roadshow-ra jelentkezett', '(15) Link'];
  selected = 0;
  @Input() eppFrissit: boolean;

  @Output() OkClick = new EventEmitter<void>();
  @Output() CancelClick = new EventEmitter<void>();

  constructor(projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  ngOnInit() {
    this.selected = this.projektservice.DtoEdited.Statusz;
  }

  change(i) {
    this.selected = i;
  }

  onSubmit() {
    this.projektservice.DtoEdited.Statusz = this.selected;

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

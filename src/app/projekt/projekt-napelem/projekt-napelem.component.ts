import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {rowanimation} from '../../animation/rowAnimation';
import {ProjektDto} from '../projektdto';
import {deepCopy} from '../../tools/deepCopy';
import {SpinnerService} from '../../tools/spinner/spinner.service';

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
  @Output() eventOk = new EventEmitter<ProjektDto>();
  @Output() eventCancel = new EventEmitter<void>();

  entries = ['', 'Nincs megrendelve', 'Megrendelve', 'Raktárban', 'Kiszállítva/telepítve', 'Harmadik fél biztosítja'];
  selected = '';

  projektservice: ProjektService;
  spinnerservice: SpinnerService;

  constructor(projektservice: ProjektService,
              spinnerservice: SpinnerService) {
    this.projektservice = projektservice;
    this.spinnerservice = spinnerservice;
  }

  ngOnInit() {
    this.selected = this.DtoEdited.Napelemallapot || '';
  }

  change(entry) {
    this.selected = entry;
  }

  onSubmit() {
    this.DtoEdited.Napelemallapot = this.selected;

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

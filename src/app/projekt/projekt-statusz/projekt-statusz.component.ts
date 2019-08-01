import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {rowanimation} from '../../animation/rowAnimation';
import {deepCopy} from '../../tools/deepCopy';
import {ProjektDto} from '../projektdto';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-projekt-statusz',
  templateUrl: './projekt-statusz.component.html',
  animations: [rowanimation]
})
export class ProjektStatuszComponent implements OnInit, OnDestroy {
  @Input() eppFrissit: boolean;
  DtoEdited = new ProjektDto();
  @Input() set DtoOriginal(value: ProjektDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventOk = new EventEmitter<ProjektDto>();
  @Output() eventCancel = new EventEmitter<void>();

  entries = ['(0) Mind', '(1) Ajánlat', '(2) Fut', '(3) Kész', '(4) Pályázatra vár', '(5) Mástól megrendelte', '(6) Döglött',
    '(7) Csak érdeklődött', '(8) Helyszíni felmérést kér', '(9) Kommunikál, van remény', '(10) Még papírozni kell',
    '(11) Elhalasztva', '(12) Passzív', '(13) Felmérés után', '(14) Roadshow-ra jelentkezett', '(15) Link'];
  selected = 0;

  projektservice: ProjektService;
  spinnerservice: SpinnerService;

  constructor(projektservice: ProjektService,
              spinnerservice: SpinnerService) {
    this.projektservice = projektservice;
    this.spinnerservice = spinnerservice;
  }

  ngOnInit() {
    this.selected = this.DtoEdited.Statusz;
  }

  change(i) {
    this.selected = i;
  }

  onSubmit() {
    this.DtoEdited.Statusz = this.selected;

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

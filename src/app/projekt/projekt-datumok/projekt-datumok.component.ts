import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProjektService} from '../projekt.service';
import * as moment from 'moment';
import {deepCopy} from '../../tools/deepCopy';
import {ProjektDto} from '../projektdto';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-projekt-datumok',
  templateUrl: './projekt-datumok.component.html'
})
export class ProjektDatumokComponent implements OnInit, OnDestroy {
  @Input() eppFrissit: boolean;
  DtoEdited = new ProjektDto();
  @Input() set DtoOriginal(value: ProjektDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventOk = new EventEmitter<ProjektDto>();
  @Output() eventCancel = new EventEmitter<void>();

  Keletkezett: any;
  Megrendelve: any;
  KivHat: any;

  projektservice: ProjektService;
  spinnerservice: SpinnerService;

  constructor(projektservice: ProjektService,
              spinnerservice: SpinnerService) {
    this.projektservice = projektservice;
    this.spinnerservice = spinnerservice;
  }

  ngOnInit() {
    this.Keletkezett = moment(this.DtoEdited.Keletkezett).format('YYYY-MM-DD');
    this.Megrendelve = moment(this.DtoEdited.Megrendelve).format('YYYY-MM-DD');
    this.KivHat = moment(this.DtoEdited.Kivitelezesihatarido).format('YYYY-MM-DD');
  }

  onSubmit() {
    this.DtoEdited.Keletkezett = moment(this.Keletkezett).toISOString(true);
    this.DtoEdited.Megrendelve = moment(this.Megrendelve).toISOString(true);
    this.DtoEdited.Kivitelezesihatarido = moment(this.KivHat).toISOString(true);

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

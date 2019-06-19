import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProjektService} from '../projekt.service';
import * as moment from 'moment';

@Component({
  selector: 'app-projekt-datumok',
  templateUrl: './projekt-datumok.component.html'
})
export class ProjektDatumokComponent implements OnInit, OnDestroy {
  projektservice: ProjektService;
  @Input() eppFrissit: boolean;

  @Output() OkClick = new EventEmitter<void>();
  @Output() CancelClick = new EventEmitter<void>();

  Keletkezett: any;
  Megrendelve: any;
  KivHat: any;

  constructor(projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  ngOnInit() {
    this.Keletkezett = moment(this.projektservice.DtoEdited.Keletkezett).format('YYYY-MM-DD');
    this.Megrendelve = moment(this.projektservice.DtoEdited.Megrendelve).format('YYYY-MM-DD');
    this.KivHat = moment(this.projektservice.DtoEdited.Kivitelezesihatarido).format('YYYY-MM-DD');
  }

  onSubmit() {
    this.projektservice.DtoEdited.Keletkezett = moment(this.Keletkezett).toISOString(true);
    this.projektservice.DtoEdited.Megrendelve = moment(this.Megrendelve).toISOString(true);
    this.projektservice.DtoEdited.Kivitelezesihatarido = moment(this.KivHat).toISOString(true);

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

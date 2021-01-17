import {Component, OnDestroy, Output, EventEmitter, Input} from '@angular/core';
import {BizonylatService} from '../../bizonylat.service';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {BizonylatDto} from '../../bizonylatdto';

@Component({
  selector: 'app-bizonylat-fuvarszamla-uj',
  templateUrl: './bizonylat-fuvarszamla-uj.component.html'
})
export class BizonylatFuvarszamlaUjComponent implements OnDestroy {
  @Input() BizonylatKod: number;
  @Output() eventMegsem = new EventEmitter();
  eppFrissit = false;
  bizonylatservice: BizonylatService;

  Fuvarszamla = '';
  Fuvardij: number;
  Fuvardijpenznemkodja: number;
  Fuvardijpenzneme: string;
  Fuvardijarfolyama: number;

  SzerkesztesMode = 0;

  constructor(private _errorservice: ErrorService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  BizonylatZoom() {
    this.SzerkesztesMode = 1;
  }

  eventStopZoom() {
    this.SzerkesztesMode = 0;
  }

  eventSelectzoom(Dto: BizonylatDto) {
    this.Fuvarszamla = Dto.Bizonylatszam;
    this.Fuvardij = Dto.Netto;
    this.Fuvardijpenznemkodja = Dto.Penznemkod;
    this.Fuvardijpenzneme = Dto.Penznem;
    this.Fuvardijarfolyama = Dto.Arfolyam;

    this.SzerkesztesMode = 0;
  }

  onSubmit() {

  }

  doCancel() {
    this.eventMegsem.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {PenztartetelService} from '../penztartetel.service';
import * as moment from 'moment';
import {ErrorService} from '../../tools/errorbox/error.service';
import {PenztartetelDto} from '../penztarteteldto';

@Component({
  selector: 'app-penztartetel-szerkesztes',
  templateUrl: './penztartetel-szerkesztes.component.html'
})
export class PenztartetelSzerkesztesComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('jogcim', {static: true}) jogcimInput: ElementRef;
  @ViewChild('ugyfel', {static: true}) ugyfelInput: ElementRef;
  @ViewChild('bizonylatszam', {static: true}) bizonylatszamInput: ElementRef;
  @ViewChild('bevetel', {static: true}) bevetelInput: ElementRef;
  @ViewChild('kiadas', {static: true}) kiadasInput: ElementRef;

  @Input() Penztarkod = -1;

  DtoEdited = new PenztartetelDto();
  datum = moment().format('YYYY-MM-DD');

  @Output() eventSzerkeszteskesz = new EventEmitter<PenztartetelDto>();

  eppFrissit = false;

  penztartetelservice: PenztartetelService;

  constructor(private _errorservice: ErrorService,
              penztartetelservice: PenztartetelService) {
    this.penztartetelservice = penztartetelservice;
  }

  ngOnInit() {
    this.eppFrissit = true;
    this.penztartetelservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.DtoEdited = res.Result[0];
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
        });
  }

  ngAfterViewInit() {
    this.jogcimInput.nativeElement.selectedIndex = 2;
    this.jogcimchange();
  }

  jogcimchange() {
    this.ugyfelInput.nativeElement.readOnly = false;
    this.bizonylatszamInput.nativeElement.readOnly = false;
    this.bevetelInput.nativeElement.readOnly = false;
    this.kiadasInput.nativeElement.readOnly = false;

    switch (this.jogcimInput.nativeElement.selectedIndex) {
      case 0: // Bevét korrekció
        this.ugyfelInput.nativeElement.readOnly = true;
        this.bizonylatszamInput.nativeElement.readOnly = true;
        this.bevetelInput.nativeElement.readOnly = true;
        break;
      case 1: // Kiadás korrekció
        this.ugyfelInput.nativeElement.readOnly = true;
        this.bizonylatszamInput.nativeElement.readOnly = true;
        this.kiadasInput.nativeElement.readOnly = true;
        break;
      case 2: // pénzfelvét bankból
        this.ugyfelInput.nativeElement.readOnly = true;
        this.bizonylatszamInput.nativeElement.readOnly = true;
        this.kiadasInput.nativeElement.readOnly = true;
        break;
      case 3: // befizetés bankba
        this.ugyfelInput.nativeElement.readOnly = true;
        this.bizonylatszamInput.nativeElement.readOnly = true;
        this.bevetelInput.nativeElement.readOnly = true;
        break;
      case 4: // Bejövő számla
        this.bevetelInput.nativeElement.readOnly = true;
        break;
      case 5: // Kimenő számla
        this.kiadasInput.nativeElement.readOnly = true;
        break;
      case 6: // Bérkifizetés
        this.bizonylatszamInput.nativeElement.readOnly = true;
        this.bevetelInput.nativeElement.readOnly = true;
        break;
    }
  }

  onSubmit() {
    this.DtoEdited.Penztarkod = this.Penztarkod;
    this.DtoEdited.Datum = moment(this.datum).toISOString(true);

    this.eppFrissit = true;
    this.penztartetelservice.Add(this.DtoEdited)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.penztartetelservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res1.Result[0]);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onCancel() {
    this.eventSzerkeszteskesz.emit(null);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {PenztartetelService} from '../penztartetel.service';
import * as moment from 'moment';
import {PenztarService} from '../../penztar/penztar.service';
import {PenztartetelContainerMode} from '../penztartetelcontainermode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-penztartetel-szerkesztes',
  templateUrl: './penztartetel-szerkesztes.component.html'
})
export class PenztartetelSzerkesztesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('jogcim') jogcimInput: ElementRef;
  @ViewChild('ugyfel') ugyfelInput: ElementRef;
  @ViewChild('bizonylatszam') bizonylatszamInput: ElementRef;
  @ViewChild('bevetel') bevetelInput: ElementRef;
  @ViewChild('kiadas') kiadasInput: ElementRef;

  penztartetelservice: PenztartetelService;
  datum = moment().format('YYYY-MM-DD');

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(penztartetelservice: PenztartetelService,
              private _penztarservice: PenztarService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService) {
    this.penztartetelservice = penztartetelservice;
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
    this.penztartetelservice.DtoEdited.Penztarkod = this._penztarservice.Dto[this._penztarservice.DtoSelectedIndex].Penztarkod;
    this.penztartetelservice.DtoEdited.Datum = moment(this.datum).toISOString(true);

    this.eppFrissit = true;
    this.penztartetelservice.Add(this.penztartetelservice.DtoEdited)
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

        this.penztartetelservice.Dto.unshift(res1.Result[0]);

        return this._penztarservice.ReadById(this._penztarservice.Dto[this._penztarservice.DtoSelectedIndex].Penztarkod);
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        this._penztarservice.Dto[this._penztarservice.DtoSelectedIndex] = res2.Result[0];

        this.eppFrissit = false;
        this.navigal();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    this.penztartetelservice.ContainerMode = PenztartetelContainerMode.List;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

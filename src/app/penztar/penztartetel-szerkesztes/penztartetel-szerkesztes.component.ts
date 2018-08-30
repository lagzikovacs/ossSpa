import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PenztartetelService} from '../penztartetel.service';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import * as moment from 'moment';
import {PenztarService} from '../penztar.service';
import {PenztartetelContainerMode} from "../penztartetelcontainermode";

@Component({
  selector: 'app-penztartetel-szerkesztes',
  templateUrl: './penztartetel-szerkesztes.component.html',
  styleUrls: ['./penztartetel-szerkesztes.component.css']
})
export class PenztartetelSzerkesztesComponent implements AfterViewInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  @ViewChild('jogcim') jogcimInput: ElementRef;
  @ViewChild('ugyfel') ugyfelInput: ElementRef;
  @ViewChild('bizonylatszam') bizonylatszamInput: ElementRef;
  @ViewChild('bevetel') bevetelInput: ElementRef;
  @ViewChild('kiadas') kiadasInput: ElementRef;

  penztartetelservice: PenztartetelService;
  eppFrissit = false;
  datum = moment().format('YYYY-MM-DD');

  constructor(penztartetelservice: PenztartetelService,
              private _penztarservice: PenztarService) {
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
    this.penztartetelservice.DtoEdited.PENZTARKOD = this._penztarservice.Dto[this._penztarservice.DtoSelectedIndex].PENZTARKOD;
    this.penztartetelservice.DtoEdited.DATUM = moment(this.datum).toISOString(true);

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

        return this._penztarservice.ReadById(this._penztarservice.Dto[this._penztarservice.DtoSelectedIndex].PENZTARKOD);
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        this._penztarservice.Dto[this._penztarservice.DtoSelectedIndex] = res2.Result[0];

        this.navigal();
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    this.penztartetelservice.ContainerMode = PenztartetelContainerMode.List;
  }
}

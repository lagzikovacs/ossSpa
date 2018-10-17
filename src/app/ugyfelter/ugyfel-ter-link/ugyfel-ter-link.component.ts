import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {UgyfelterService} from '../ugyfelter.service';
import {UgyfelService} from '../../ugyfel/ugyfel.service';
import * as moment from 'moment';

@Component({
  selector: 'app-ugyfel-ter-link',
  templateUrl: './ugyfel-ter-link.component.html',
  styleUrls: ['./ugyfel-ter-link.component.css']
})
export class UgyfelTerLinkComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  link = '';
  eppFrissit = false;
  kikuldesikodidopontja: any;

  constructor(private _ugyfelservice: UgyfelService,
              private _ugyfelterservice: UgyfelterService) { }

  ngOnInit() {
    this.idopont();
  }

  idopont() {
    if (this._ugyfelservice.Dto[this._ugyfelservice.DtoSelectedIndex].KIKULDESIKODIDOPONTJA !== null) {
      this.kikuldesikodidopontja =
        moment(this._ugyfelservice.Dto[this._ugyfelservice.DtoSelectedIndex].KIKULDESIKODIDOPONTJA).format('YYYY-MM-DD HH:MM:SS');
    } else {
      this.kikuldesikodidopontja = '';
    }
  }

  ugyfelterlink() {
    this.eppFrissit = true;
    this._ugyfelterservice.UgyfelterLink(this._ugyfelservice.Dto[this._ugyfelservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.link = res.Result;
        return this._ugyfelservice.Get(this._ugyfelservice.Dto[this._ugyfelservice.DtoSelectedIndex].UGYFELKOD);
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        this._ugyfelservice.Dto[this._ugyfelservice.DtoSelectedIndex] = res1.Result[0];
        this.idopont();
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

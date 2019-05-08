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
    if (this._ugyfelservice.Dto[this._ugyfelservice.DtoSelectedIndex].Kikuldesikodidopontja !== null) {
      this.kikuldesidopontja();
      this._ugyfelterservice.GetLink(this._ugyfelservice.Dto[this._ugyfelservice.DtoSelectedIndex])
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.link = res.Result;
        })
        .catch(err => {
          this.eppFrissit = false;
          this.errormodal.show(err);
        });
    } else {
      this.kikuldesikodidopontja = '';
      this.link = '';
    }
  }

  kikuldesidopontja() {
    this.kikuldesikodidopontja =
      moment(this._ugyfelservice.Dto[this._ugyfelservice.DtoSelectedIndex].Kikuldesikodidopontja).format('YYYY-MM-DD HH:mm:ss');
  }

  ugyfelterlink() {
    this.eppFrissit = true;
    this._ugyfelterservice.CreateNewLink(this._ugyfelservice.Dto[this._ugyfelservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.link = res.Result;
        return this._ugyfelservice.Get(this._ugyfelservice.Dto[this._ugyfelservice.DtoSelectedIndex].Ugyfelkod);
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        this._ugyfelservice.Dto[this._ugyfelservice.DtoSelectedIndex] = res1.Result[0];
        this.kikuldesidopontja();
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

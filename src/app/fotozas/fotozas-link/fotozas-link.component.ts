import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {IratService} from '../../irat/irat/irat.service';
import {FotozasService} from '../fotozas.service';
import * as moment from 'moment';

@Component({
  selector: 'app-fotozas-link',
  templateUrl: './fotozas-link.component.html',
  styleUrls: ['./fotozas-link.component.css']
})
export class FotozasLinkComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  link = '';
  eppFrissit = false;
  kikuldesikodidopontja: any;

  constructor(private _iratservice: IratService,
              private _fotozasservice: FotozasService) { }

  ngOnInit() {
    if (this._iratservice.Dto[this._iratservice.DtoSelectedIndex].KIKULDESIKODIDOPONTJA !== null) {
      this.kikuldesidopontja();
      this._fotozasservice.GetLink(this._iratservice.Dto[this._iratservice.DtoSelectedIndex])
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
      moment(this._iratservice.Dto[this._iratservice.DtoSelectedIndex].KIKULDESIKODIDOPONTJA).format('YYYY-MM-DD HH:mm:ss');
  }

  fotozaslink() {
    this.eppFrissit = true;
    this._fotozasservice.CreateNewLink(this._iratservice.Dto[this._iratservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.link = res.Result;
        return this._iratservice.Get(this._iratservice.Dto[this._iratservice.DtoSelectedIndex].IRATKOD);
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        this._iratservice.Dto[this._iratservice.DtoSelectedIndex] = res1.Result[0];
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
import {Component, OnDestroy, OnInit} from '@angular/core';
import {IratService} from '../../irat/irat.service';
import {FotozasService} from '../fotozas.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {deepCopy} from '../../tools/deepCopy';
import {propCopy} from '../../tools/propCopy';
import {IratDto} from '../../irat/iratdto';

@Component({
  selector: 'app-fotozas-link',
  templateUrl: './fotozas-link.component.html'
})
export class FotozasLinkComponent implements OnInit, OnDestroy {
  DtoWork = new IratDto();
  link = '';
  kikuldesikodidopontja: any;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _iratservice: IratService,
              private _fotozasservice: FotozasService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService) { }

  ngOnInit() {
    this.DtoWork = deepCopy(this._iratservice.Dto[this._iratservice.DtoSelectedIndex]);

    if (this.DtoWork.Kikuldesikodidopontja !== null) {
      this.kikuldesidopontja();

      this._fotozasservice.GetLink(this.DtoWork)
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.link = environment.OSSRef + res.Result;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.kikuldesikodidopontja = '';
      this.link = '';
    }
  }

  kikuldesidopontja() {
    this.kikuldesikodidopontja =
      moment(this.DtoWork.Kikuldesikodidopontja).format('YYYY-MM-DD HH:mm:ss');
  }

  fotozaslink() {
    this.eppFrissit = true;
    this._fotozasservice.CreateNewLink(this.DtoWork)
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.link = environment.OSSRef + res.Result;
        return this._iratservice.Get(this.DtoWork.Iratkod);
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        this.DtoWork = res1.Result[0];
        this.kikuldesidopontja();

        propCopy(res1.Result[0], this._iratservice.Dto[this._iratservice.DtoSelectedIndex]);

        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

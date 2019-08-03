import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IratService} from '../../irat/irat.service';
import {FotozasService} from '../fotozas.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';
import {ErrorService} from '../../tools/errorbox/error.service';
import {deepCopy} from '../../tools/deepCopy';
import {IratDto} from '../../irat/iratdto';

@Component({
  selector: 'app-fotozas-link',
  templateUrl: './fotozas-link.component.html'
})
export class FotozasLinkComponent implements OnInit, OnDestroy {
  DtoEdited = new IratDto();
  @Input() set DtoOriginal(value: IratDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<IratDto>();

  link = '';
  kikuldesikodidopontja: any;

  eppFrissit = false;

  constructor(private _iratservice: IratService,
              private _fotozasservice: FotozasService,
              private _errorservice: ErrorService) {
  }

  ngOnInit() {
    if (this.DtoEdited.Kikuldesikodidopontja !== null) {
      this.kikuldesidopontja();

      this.eppFrissit = true;
      this._fotozasservice.GetLink(this.DtoEdited)
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
      moment(this.DtoEdited.Kikuldesikodidopontja).format('YYYY-MM-DD HH:mm:ss');
  }

  fotozaslink() {
    this.eppFrissit = true;
    this._fotozasservice.CreateNewLink(this.DtoEdited)
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.link = environment.OSSRef + res.Result;
        return this._iratservice.Get(this.DtoEdited.Iratkod);
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        this.DtoEdited = res1.Result[0];
        this.kikuldesidopontja();

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res1.Result[0]);
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

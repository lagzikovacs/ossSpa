import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UgyfelterService} from '../ugyfelter.service';
import {UgyfelService} from '../../ugyfel/ugyfel.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';
import {ErrorService} from '../../tools/errorbox/error.service';
import {UgyfelDto} from '../../ugyfel/ugyfeldto';
import {deepCopy} from '../../tools/deepCopy';
import {EgyMode} from '../../common/enums/egymode';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-ugyfel-ter-link',
  templateUrl: './ugyfel-ter-link.component.html',
  animations: [rowanimation]
})
export class UgyfelTerLinkComponent implements OnInit, OnDestroy {
  DtoEdited = new UgyfelDto();
  @Input() set DtoOriginal(value: UgyfelDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<UgyfelDto>();

  link = '';
  kikuldesikodidopontja: any;

  egymode = EgyMode.Blank;
  eppFrissit = false;

  constructor(private _ugyfelservice: UgyfelService,
              private _ugyfelterservice: UgyfelterService,
              private _errorservice: ErrorService) {
  }

  ngOnInit() {
    if (this.DtoEdited.Kikuldesikodidopontja !== null) {
      this.eppFrissit = true;
      this._ugyfelterservice.GetLink(this.DtoEdited)
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.link = environment.OSSRef + res.Result;
          this.kikuldesidopontja();
          this.eppFrissit = false;
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
    this.kikuldesikodidopontja = moment(this.DtoEdited.Kikuldesikodidopontja).format('YYYY-MM-DD HH:mm:ss');
  }

  doUj() {
    if (this.link === '') {
      this.onUj();
    } else {
      this.egymode = EgyMode.Modositas;
    }
  }

  onUj() {
    this.eppFrissit = true;
    this._ugyfelterservice.CreateNewLink(this.DtoEdited)
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.link = environment.OSSRef + res.Result;
        return this._ugyfelservice.Get(this.DtoEdited.Ugyfelkod);
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        this.DtoEdited = res1.Result[0];
        this.kikuldesidopontja();
        this.eppFrissit = false;

        this.egymode = EgyMode.Blank;

        this.eventSzerkeszteskesz.emit(res1.Result[0]);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  onMegsem() {
    this.egymode = EgyMode.Blank;
  }

  doTorles() {
    this.egymode = EgyMode.Torles;
  }
  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;
      this._ugyfelterservice.ClearLink(this.DtoEdited)
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.link = '';
          return this._ugyfelservice.Get(this.DtoEdited.Ugyfelkod);
        })
        .then(res1 => {
          if (res1.Error !== null) {
            throw res1.Error;
          }

          this.DtoEdited = res1.Result[0];
          this.kikuldesikodidopontja = '';
          this.eppFrissit = false;

          this.egymode = EgyMode.Blank;

          this.eventSzerkeszteskesz.emit(res1.Result[0]);
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.egymode = EgyMode.Blank;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

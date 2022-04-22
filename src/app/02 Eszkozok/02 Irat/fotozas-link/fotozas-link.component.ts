import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IratService} from '../../../02 Eszkozok/02 Irat/irat/irat.service';
import * as moment from 'moment';
import {environment} from '../../../../environments/environment';
import {ErrorService} from '../../../common/errorbox/error.service';
import {deepCopy} from '../../../common/deepCopy';
import {IratDto} from '../../../02 Eszkozok/02 Irat/irat/iratdto';
import {EgyMode} from '../../../common/enums/egymode';
import {FotozasService} from "../../../ext/fotozas/fotozas.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  egymode = EgyMode.Blank;
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
    this.kikuldesikodidopontja =
      moment(this.DtoEdited.Kikuldesikodidopontja).format('YYYY-MM-DD HH:mm:ss');
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
      this._fotozasservice.ClearLink(this.DtoEdited)
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.link = '';
          return this._iratservice.Get(this.DtoEdited.Iratkod);
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

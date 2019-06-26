import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {AfakulcsService} from '../afakulcs.service';
import {CikkService} from '../../../cikk/cikk.service';
import {ZoomSources} from '../../../enums/zoomsources';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {CikkSzerkesztesMode} from '../../../cikk/cikkszerkesztesmode';
import {BizonylattetelSzerkesztesMode} from '../../../bizonylat/bizonylattetelszerkesztesmode';
import {BizonylatService} from '../../../bizonylat/bizonylat.service';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {TablaComponent} from '../../../tools/tabla/tabla.component';

@Component({
  selector: 'app-afakulcs-list',
  templateUrl: './afakulcs-list.component.html'
})
export class AfakulcsListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla') tabla: TablaComponent;

  szurok = ['ÁFA kulcs'];
  mod = false;
  afakulcsservice: AfakulcsService;

  @Output() KontenerKeres = new EventEmitter<void>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _logonservice: LogonService,
              private _cikkservice: CikkService,
              private _bizonylatservice: BizonylatService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              afakulcsservice: AfakulcsService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.afakulcsservice = afakulcsservice;
  }

  ngOnInit() {
    if (this.afakulcsservice.zoom) {
      this.onKereses();
    }
  }

  onKereses() {
    this.afakulcsservice.elsokereses = true;
    this.afakulcsservice.ekDto.rekordtol = 0;
    this.afakulcsservice.DtoSelectedIndex = -1;

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.afakulcsservice.Read(this.afakulcsservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.afakulcsservice.elsokereses) {
          this.afakulcsservice.Dto = res.Result;
          this.afakulcsservice.elsokereses = false;
        } else {
          const buf = [...this.afakulcsservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.afakulcsservice.Dto = buf;
        }

        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  selectforzoom(i: number) {
    if (this.afakulcsservice.zoomsource === ZoomSources.Cikk) {
      this._cikkservice.DtoEdited.Afakulcskod = this.afakulcsservice.Dto[i].Afakulcskod;
      this._cikkservice.DtoEdited.Afakulcs = this.afakulcsservice.Dto[i].Afakulcs1;
      this._cikkservice.DtoEdited.Afamerteke = this.afakulcsservice.Dto[i].Afamerteke;
    }
    if (this.afakulcsservice.zoomsource === ZoomSources.Bizonylattetel) {
      this._bizonylatservice.TetelDtoEdited.Afakulcskod = this.afakulcsservice.Dto[i].Afakulcskod;
      this._bizonylatservice.TetelDtoEdited.Afakulcs = this.afakulcsservice.Dto[i].Afakulcs1;
      this._bizonylatservice.TetelDtoEdited.Afamerteke = this.afakulcsservice.Dto[i].Afamerteke;
    }

    this.stopzoom();
  }
  stopzoom() {
    this.afakulcsservice.zoom = false;

    if (this.afakulcsservice.zoomsource === ZoomSources.Cikk) {
      this._cikkservice.SzerkesztesMode = CikkSzerkesztesMode.Blank;
    }
    if (this.afakulcsservice.zoomsource === ZoomSources.Bizonylattetel) {
      this._bizonylatservice.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;
    }
  }

  setClickedRow(i: number) {
    this.afakulcsservice.DtoSelectedIndex = i;
    this.afakulcsservice.uj = false;
  }

  uj() {
    this.eppFrissit = true;
    this.afakulcsservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.afakulcsservice.uj = true;
        this.afakulcsservice.DtoEdited = res.Result[0];
        this.afakulcsservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.KontenerKeres.emit();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  torlesutan() {
    this.tabla.clearselections();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

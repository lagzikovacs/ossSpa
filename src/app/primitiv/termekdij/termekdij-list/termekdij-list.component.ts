import {Component, OnDestroy, OnInit} from '@angular/core';
import {TermekdijService} from '../termekdij.service';
import {TermekdijEgyMode} from '../termekdijegymode';
import {TermekdijContainerMode} from '../termekdijcontainermode';
import {LogonService} from '../../../logon/logon.service';
import {CikkService} from '../../../cikk/cikk.service';
import {BizonylatService} from '../../../bizonylat/bizonylat.service';
import {JogKod} from '../../../enums/jogkod';
import {ZoomSources} from '../../../enums/zoomsources';
import {CikkSzerkesztesMode} from '../../../cikk/cikkszerkesztesmode';
import {BizonylattetelSzerkesztesMode} from '../../../bizonylat/bizonylattetelszerkesztesmode';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';

@Component({
  selector: 'app-termekdij-list',
  templateUrl: './termekdij-list.component.html'
})
export class TermekdijListComponent implements OnInit, OnDestroy {
  szurok = ['KT'];
  mod = false;
  ti = -1;

  termekdijservice: TermekdijService;

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
              termekdijservice: TermekdijService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.termekdijservice = termekdijservice;
  }

  ngOnInit() {
    if (this.termekdijservice.zoom) {
      this.onKereses();
    }
  }

  onKereses() {
    this.termekdijservice.elsokereses = true;
    this.termekdijservice.ekDto.rekordtol = 0;

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.termekdijservice.Read(this.termekdijservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.termekdijservice.elsokereses) {
          this.termekdijservice.Dto = res.Result;
          this.termekdijservice.elsokereses = false;
        } else {
          const buf = [...this.termekdijservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.termekdijservice.Dto = buf;
        }

        this.eppFrissit = false;

        if (this.termekdijservice.zoom) {
          window.scrollTo(0, document.body.scrollHeight);
        }
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  selectforzoom(i: number) {
    if (this.termekdijservice.zoomsource === ZoomSources.Cikk) {
      this._cikkservice.DtoEdited.Termekdijkod = this.termekdijservice.Dto[i].Termekdijkod;
      this._cikkservice.DtoEdited.Termekdijkt = this.termekdijservice.Dto[i].Termekdijkt;
      this._cikkservice.DtoEdited.Termekdijmegnevezes = this.termekdijservice.Dto[i].Termekdijmegnevezes;
      this._cikkservice.DtoEdited.Termekdijegysegar = this.termekdijservice.Dto[i].Termekdijegysegar;
    }
    if (this.termekdijservice.zoomsource === ZoomSources.Bizonylattetel) {
      this._bizonylatservice.TetelDtoEdited.Termekdijkod = this.termekdijservice.Dto[i].Termekdijkod;
      this._bizonylatservice.TetelDtoEdited.Termekdijkt = this.termekdijservice.Dto[i].Termekdijkt;
      this._bizonylatservice.TetelDtoEdited.Termekdijmegnevezes = this.termekdijservice.Dto[i].Termekdijmegnevezes;
      this._bizonylatservice.TetelDtoEdited.Termekdijegysegar = this.termekdijservice.Dto[i].Termekdijegysegar;
    }

    this.stopzoom();
  }
  stopzoom() {
    this.termekdijservice.zoom = false;

    if (this.termekdijservice.zoomsource === ZoomSources.Cikk) {
      this._cikkservice.SzerkesztesMode = CikkSzerkesztesMode.Blank;
    }
    if (this.termekdijservice.zoomsource === ZoomSources.Bizonylattetel) {
      this._bizonylatservice.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;
    }
  }

  setClickedRow(i: number) {
    this.termekdijservice.DtoSelectedIndex = i;
    this.termekdijservice.uj = false;
    this.termekdijservice.ContainerMode = TermekdijContainerMode.Egy;
    this.termekdijservice.EgyMode = TermekdijEgyMode.Reszletek;
  }

  uj() {
    this.eppFrissit = true;
    this.termekdijservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.termekdijservice.uj = true;
        this.termekdijservice.DtoEdited = res.Result[0];
        this.termekdijservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.termekdijservice.ContainerMode = TermekdijContainerMode.Uj;
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

import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PenztarService} from '../penztar.service';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {PenztartetelService} from '../../penztartetel/penztartetel.service';
import {PenztartetelDto} from '../../penztartetel/penztarteteldto';
import {PenztarContainerMode} from '../penztarcontainermode';
import {PenztarEgyMode} from '../penztaregymode';
import {PenztartetelContainerMode} from '../../penztartetel/penztartetelcontainermode';
import {PenztarSzerkesztesMode} from '../penztarszerkesztesmode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';

@Component({
  selector: 'app-penztar-list',
  templateUrl: './penztar-list.component.html'
})
export class PenztarListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla') tabla: TablaComponent;

  szurok = ['Pénztár'];
  mod = false;
  elsokereses = true;
  penztarservice: PenztarService;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              penztarservice: PenztarService,
              private _penztartetelservice: PenztartetelService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PENZTARMOD]);
    this.penztarservice = penztarservice;
  }

  ngOnInit() {
    this.onKereses();
  }

  onKereses() {
    this.elsokereses = true;
    this.penztarservice.ekDto.rekordtol = 0;

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.penztarservice.Read(this.penztarservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.elsokereses) {
          this.penztarservice.Dto = res.Result;
          this.elsokereses = false;
        } else {
          const buf = [...this.penztarservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.penztarservice.Dto = buf;
        }

        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  selectforzoom(i: number) {
    this.setClickedRow(i);
  }

  setClickedRow(i: number) {
    this.penztarservice.DtoSelectedIndex = i;
    this.penztarservice.uj = false;
    this._penztartetelservice.Dto = new Array<PenztartetelDto>();
    this._penztartetelservice.OsszesRekord = 0;
    this.penztarservice.EgyMode = PenztarEgyMode.Tetelek;
    this._penztartetelservice.ContainerMode = PenztartetelContainerMode.List;
  }

  uj() {
    this.eppFrissit = true;
    this.penztarservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.penztarservice.uj = true;
        this.penztarservice.DtoEdited = res.Result[0];
        this.penztarservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.penztarservice.ContainerMode = PenztarContainerMode.Uj;
        this.penztarservice.SzerkesztesMode = PenztarSzerkesztesMode.Blank;
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

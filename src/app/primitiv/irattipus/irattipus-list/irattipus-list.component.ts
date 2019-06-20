import {Component, OnDestroy, OnInit} from '@angular/core';
import {IrattipusService} from '../irattipus.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {ZoomSources} from '../../../enums/zoomsources';
import {ProjektkapcsolatService} from '../../../projektkapcsolat/projektkapcsolat.service';
import {IratService} from '../../../irat/irat.service';
import {IrattipusEgyMode} from '../irattipusegymode';
import {IrattipusContainerMode} from '../irattipuscontainermode';
import {IratSzerkesztesMode} from '../../../irat/iratszerkesztesmode';
import {BizonylatesiratSzerkesztesMode} from '../../../projektkapcsolat/bizonylatesiratszerkesztesmode';
import {BizonylatkapcsolatService} from '../../../bizonylatkapcsolat/bizonylatkapcsolat.service';
import {BizonylatKapcsolatSzerkesztesMode} from '../../../bizonylatkapcsolat/bizonylatkapcsolatszerkesztesmode';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';

@Component({
  selector: 'app-irattipus-list',
  templateUrl: './irattipus-list.component.html'
})
export class IrattipusListComponent implements OnInit, OnDestroy {
  szurok = ['Irattipus'];
  mod = false;
  ti = -1;

  irattipusservice: IrattipusService;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _logonservice: LogonService,
              private _iratservice: IratService,
              private _projektkapcsolatservice: ProjektkapcsolatService,
              private _bizonylatkapcsolatservice: BizonylatkapcsolatService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              irattipusservice: IrattipusService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.irattipusservice = irattipusservice;
  }

  ngOnInit() {
    if (this.irattipusservice.zoom) {
      this.onKereses();
    }
  }

  onKereses() {
    this.irattipusservice.elsokereses = true;
    this.irattipusservice.ekDto.rekordtol = 0;

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.irattipusservice.Read(this.irattipusservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.irattipusservice.elsokereses) {
          this.irattipusservice.Dto = res.Result;
          this.irattipusservice.elsokereses = false;
        } else {
          const buf = [...this.irattipusservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.irattipusservice.Dto = buf;
        }

        this.eppFrissit = false;

        if (this.irattipusservice.zoom) {
          window.scrollTo(0, document.body.scrollHeight);
        }
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  selectforzoom(i: number) {
    if (this.irattipusservice.zoomsource === ZoomSources.Irat) {
      this._iratservice.DtoEdited.Irattipuskod = this.irattipusservice.Dto[i].Irattipuskod;
      this._iratservice.DtoEdited.Irattipus = this.irattipusservice.Dto[i].Irattipus1;

      this.stopzoom();
    }
    if (this.irattipusservice.zoomsource === ZoomSources.Projektirat) {
      this._projektkapcsolatservice.UjIratDto.Irattipuskod = this.irattipusservice.Dto[i].Irattipuskod;
      this._projektkapcsolatservice.UjIratDto.Irattipus = this.irattipusservice.Dto[i].Irattipus1;

      this.stopzoom();
    }
    if (this.irattipusservice.zoomsource === ZoomSources.Bizonylatirat) {
      this._bizonylatkapcsolatservice.UjIratDto.Irattipuskod = this.irattipusservice.Dto[i].Irattipuskod;
      this._bizonylatkapcsolatservice.UjIratDto.Irattipus = this.irattipusservice.Dto[i].Irattipus1;

      this.stopzoom();
    }
  }
  stopzoom() {
    this.irattipusservice.zoom = false;

    if (this.irattipusservice.zoomsource === ZoomSources.Irat) {
      this._iratservice.SzerkesztesMode = IratSzerkesztesMode.Blank;
    }
    if (this.irattipusservice.zoomsource === ZoomSources.Projektirat) {
      this._projektkapcsolatservice.SzerkesztesMode = BizonylatesiratSzerkesztesMode.Blank;
    }
    if (this.irattipusservice.zoomsource === ZoomSources.Bizonylatirat) {
      this._bizonylatkapcsolatservice.SzerkesztesMode = BizonylatKapcsolatSzerkesztesMode.Blank;
    }
  }

  setClickedRow(i: number) {
    this.irattipusservice.DtoSelectedIndex = i;
    this.irattipusservice.uj = false;
    this.irattipusservice.ContainerMode = IrattipusContainerMode.Egy;
    this.irattipusservice.EgyMode = IrattipusEgyMode.Reszletek;
  }

  uj() {
    this.eppFrissit = true;
    this.irattipusservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.irattipusservice.uj = true;
        this.irattipusservice.DtoEdited = res.Result[0];
        this.irattipusservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.irattipusservice.ContainerMode = IrattipusContainerMode.Uj;
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

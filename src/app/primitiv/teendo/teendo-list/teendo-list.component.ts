import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TeendoService} from '../teendo.service';
import {JogKod} from '../../../enums/jogkod';
import {LogonService} from '../../../logon/logon.service';
import {ZoomSources} from '../../../enums/zoomsources';
import {ProjektteendoService} from '../../../projektteendo/projektteendo.service';
import {TeendoContainerMode} from '../teendocontainermode';
import {TeendoEgyMode} from '../teendoegymode';
import {ProjektteendoSzerkesztesMode} from '../../../projektteendo/projektteendoszerkesztesmode';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {TablaComponent} from '../../../tools/tabla/tabla.component';

@Component({
  selector: 'app-teendo-list',
  templateUrl: './teendo-list.component.html'
})
export class TeendoListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla') tabla: TablaComponent;

  szurok = ['Teendő'];
  mod = false;
  teendoservice: TeendoService;

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
              teendoservice: TeendoService,
              private _projektteendoservice: ProjektteendoService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.teendoservice = teendoservice;
  }

  ngOnInit() {
    if (this.teendoservice.zoom) {
      this.onKereses();
    }
  }

  onKereses() {
    this.teendoservice.elsokereses = true;
    this.teendoservice.ekDto.rekordtol = 0;

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.teendoservice.Read(this.teendoservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.teendoservice.elsokereses) {
          this.teendoservice.Dto = res.Result;
          this.teendoservice.elsokereses = false;
        } else {
          const buf = [...this.teendoservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.teendoservice.Dto = buf;
        }

        this.eppFrissit = false;

        if (this.teendoservice.zoom) {
          window.scrollTo(0, document.body.scrollHeight);
        }
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  selectforzoom(i: number) {
    if (this.teendoservice.zoomsource === ZoomSources.Projektteendo) {
      this._projektteendoservice.DtoEdited.Teendokod = this.teendoservice.Dto[i].Teendokod;
      this._projektteendoservice.DtoEdited.Teendo = this.teendoservice.Dto[i].Teendo1;

      this.stopzoom();
    }
  }
  stopzoom() {
    this.teendoservice.zoom = false;

    if (this.teendoservice.zoomsource === ZoomSources.Projektteendo) {
      this._projektteendoservice.SzerkesztesMode = ProjektteendoSzerkesztesMode.Blank;
    }
  }

  setClickedRow(i: number) {
    this.teendoservice.DtoSelectedIndex = i;
    this.teendoservice.uj = false;
    this.teendoservice.EgyMode = TeendoEgyMode.Reszletek;
  }

  uj() {
    this.eppFrissit = true;
    this.teendoservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.teendoservice.uj = true;
        this.teendoservice.DtoEdited = res.Result[0];
        this.teendoservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.teendoservice.ContainerMode = TeendoContainerMode.Uj;
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

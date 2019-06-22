import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FelhasznaloService} from '../felhasznalo.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {ZoomSources} from '../../../enums/zoomsources';
import {ProjektteendoService} from '../../../projektteendo/projektteendo.service';
import {FelhasznaloContainerMode} from '../felhasznalocontainermode';
import {FelhasznaloEgyMode} from '../felhasznaloegymode';
import {ProjektteendoSzerkesztesMode} from '../../../projektteendo/projektteendoszerkesztesmode';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {TablaComponent} from '../../../tools/tabla/tabla.component';

@Component({
  selector: 'app-felhasznalo-list',
  templateUrl: './felhasznalo-list.component.html'
})
export class FelhasznaloListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla') tabla: TablaComponent;

  szurok = ['Név'];
  mod = false;
  felhasznaloservice: FelhasznaloService;

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
              felhasznaloservice: FelhasznaloService,
              private _projektteendoservice: ProjektteendoService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.FELHASZNALOMOD]);
    this.felhasznaloservice = felhasznaloservice;
  }

  ngOnInit() {
    if (this.felhasznaloservice.zoom) {
      this.onKereses();
    }
  }

  onKereses() {
    this.felhasznaloservice.elsokereses = true;
    this.felhasznaloservice.ekDto.rekordtol = 0;

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.felhasznaloservice.Read(this.felhasznaloservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.felhasznaloservice.elsokereses) {
          this.felhasznaloservice.Dto = res.Result;
          this.felhasznaloservice.elsokereses = false;
        } else {
          const buf = [...this.felhasznaloservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.felhasznaloservice.Dto = buf;
        }

        this.eppFrissit = false;

        if (this.felhasznaloservice.zoom) {
          window.scrollTo(0, document.body.scrollHeight);
        }
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  selectforzoom(i: number) {
    if (this.felhasznaloservice.zoomsource === ZoomSources.Projektteendo) {
      this._projektteendoservice.DtoEdited.Dedikalva = this.felhasznaloservice.Dto[i].Nev;

      this.stopzoom();
    }
  }
  stopzoom() {
    this.felhasznaloservice.zoom = false;

    if (this.felhasznaloservice.zoomsource === ZoomSources.Projektteendo) {
      this._projektteendoservice.SzerkesztesMode = ProjektteendoSzerkesztesMode.Blank;
    }
  }

  setClickedRow(i: number) {
    this.felhasznaloservice.DtoSelectedIndex = i;
    this.felhasznaloservice.uj = false;
    this.felhasznaloservice.EgyMode = FelhasznaloEgyMode.Reszletek;
  }

  uj() {
    this.eppFrissit = true;
    this.felhasznaloservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.felhasznaloservice.uj = true;
        this.felhasznaloservice.DtoEdited = res.Result[0];
        this.felhasznaloservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.felhasznaloservice.ContainerMode = FelhasznaloContainerMode.Uj;
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

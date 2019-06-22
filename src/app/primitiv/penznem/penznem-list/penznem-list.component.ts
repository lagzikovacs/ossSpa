import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PenznemService} from '../penznem.service';
import {LogonService} from '../../../logon/logon.service';
import {PenztarService} from '../../../penztar/penztar.service';
import {ProjektService} from '../../../projekt/projekt.service';
import {SzamlazasirendService} from '../../../szamlazasirend/szamlazasirend.service';
import {KifizetesService} from '../../../kifizetes/kifizetes.service';
import {BizonylatService} from '../../../bizonylat/bizonylat.service';
import {JogKod} from '../../../enums/jogkod';
import {ZoomSources} from '../../../enums/zoomsources';
import {PenztarSzerkesztesMode} from '../../../penztar/penztarszerkesztesmode';
import {ProjektSzerkesztesMode} from '../../../projekt/projektszerkesztesmode';
import {SzamlazasirendSzerkesztesMode} from '../../../szamlazasirend/szamlazasirendszerkesztesmode';
import {KifizetesSzerkesztesMode} from '../../../kifizetes/kifizetesszerkesztesmode';
import {BizonylatSzerkesztesMode} from '../../../bizonylat/bizonylatszerkesztesmode';
import {PenznemContainerMode} from '../penznemcontainermode';
import {PenznemEgyMode} from '../penznemegymode';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {TablaComponent} from '../../../tools/tabla/tabla.component';


@Component({
  selector: 'app-penznem-list',
  templateUrl: './penznem-list.component.html'
})
export class PenznemListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla') tabla: TablaComponent;

  szurok = ['Pénznem'];
  mod = false;
  penznemservice: PenznemService;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _logonservice: LogonService,
              private _penztarservice: PenztarService,
              private _projektservice: ProjektService,
              private _szamlazasirendservice: SzamlazasirendService,
              private _bizonylatkifizetesservice: KifizetesService,
              private _bizonylatservice: BizonylatService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              penznemservice: PenznemService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.penznemservice = penznemservice;
  }

  ngOnInit() {
    if (this.penznemservice.zoom) {
      this.onKereses();
    }
  }

  onKereses() {
    this.penznemservice.elsokereses = true;
    this.penznemservice.ekDto.rekordtol = 0;

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.penznemservice.Read(this.penznemservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.penznemservice.elsokereses) {
          this.penznemservice.Dto = res.Result;
          this.penznemservice.elsokereses = false;
        } else {
          const buf = [...this.penznemservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.penznemservice.Dto = buf;
        }

        this.eppFrissit = false;

        if (this.penznemservice.zoom) {
          window.scrollTo(0, document.body.scrollHeight);
        }
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  selectforzoom(i: number) {
    if (this.penznemservice.zoomsource === ZoomSources.Penztar) {
      this._penztarservice.DtoEdited.Penznemkod = this.penznemservice.Dto[i].Penznemkod;
      this._penztarservice.DtoEdited.Penznem = this.penznemservice.Dto[i].Penznem1;
    }
    if (this.penznemservice.zoomsource === ZoomSources.Projekt) {
      this._projektservice.DtoEdited.Penznemkod = this.penznemservice.Dto[i].Penznemkod;
      this._projektservice.DtoEdited.Penznem = this.penznemservice.Dto[i].Penznem1;
    }
    if (this.penznemservice.zoomsource === ZoomSources.Szamlazasirend) {
      this._szamlazasirendservice.DtoEdited.Penznemkod = this.penznemservice.Dto[i].Penznemkod;
      this._szamlazasirendservice.DtoEdited.Penznem = this.penznemservice.Dto[i].Penznem1;
    }
    if (this.penznemservice.zoomsource === ZoomSources.Bizonylatkifizetes) {
      this._bizonylatkifizetesservice.DtoEdited.Penznemkod = this.penznemservice.Dto[i].Penznemkod;
      this._bizonylatkifizetesservice.DtoEdited.Penznem = this.penznemservice.Dto[i].Penznem1;
    }
    if (this.penznemservice.zoomsource === ZoomSources.Bizonylat) {
      this._bizonylatservice.ComplexDtoEdited.Dto.Penznemkod = this.penznemservice.Dto[i].Penznemkod;
      this._bizonylatservice.ComplexDtoEdited.Dto.Penznem = this.penznemservice.Dto[i].Penznem1;
    }

    this.stopzoom();
  }
  stopzoom() {
    this.penznemservice.zoom = false;

    if (this.penznemservice.zoomsource === ZoomSources.Penztar) {
      this._penztarservice.SzerkesztesMode = PenztarSzerkesztesMode.Blank;
    }
    if (this.penznemservice.zoomsource === ZoomSources.Projekt) {
      this._projektservice.SzerkesztesMode = ProjektSzerkesztesMode.Blank;
    }
    if (this.penznemservice.zoomsource === ZoomSources.Szamlazasirend) {
      this._szamlazasirendservice.SzerkesztesMode = SzamlazasirendSzerkesztesMode.Blank;
    }
    if (this.penznemservice.zoomsource === ZoomSources.Bizonylatkifizetes) {
      this._bizonylatkifizetesservice.SzerkesztesMode = KifizetesSzerkesztesMode.Blank;
    }
    if (this.penznemservice.zoomsource === ZoomSources.Bizonylat) {
      this._bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.List;
    }
  }

  setClickedRow(i: number) {
    this.penznemservice.DtoSelectedIndex = i;
    this.penznemservice.uj = false;
    this.penznemservice.EgyMode = PenznemEgyMode.Reszletek;
  }

  uj() {
    this.eppFrissit = true;
    this.penznemservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.penznemservice.uj = true;
        this.penznemservice.DtoEdited = res.Result[0];
        this.penznemservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.penznemservice.ContainerMode = PenznemContainerMode.Uj;
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

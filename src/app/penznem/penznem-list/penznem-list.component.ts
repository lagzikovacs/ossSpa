import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PenznemService} from '../penznem.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {PenztarService} from '../../penztar/penztar.service';
import {ZoomSources} from '../../enums/zoomsources';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {SzamlazasirendService} from '../../szamlazasirend/szamlazasirend.service';
import {PenznemEgyMode} from '../penznemegymode';
import {PenznemContainerMode} from '../penznemcontainermode';
import {PenztarSzerkesztesMode} from '../../penztar/penztarszerkesztesmode';
import {ProjektService} from '../../projekt/projekt/projekt.service';
import {ProjektSzerkesztesMode} from '../../projekt/projekt/projektszerkesztesmode';
import {SzamlazasirendSzerkesztesMode} from '../../szamlazasirend/szamlazasirendszerkesztesmode';
import {BizonylatkifizetesService} from '../../bizonylat/bizonylatkifizetes/bizonylatkifizetes.service';
import {BizonylatKifizetesSzerkesztesMode} from '../../bizonylat/bizonylatkifizetes/bizonylatkifizetesszerkesztesmode';
import {BizonylatService} from '../../bizonylat/bizonylat.service';
import {BizonylatSzerkesztesMode} from '../../bizonylat/bizonylatszerkesztesmode';

@Component({
  selector: 'app-penznem-list',
  templateUrl: './penznem-list.component.html',
  styleUrls: ['./penznem-list.component.css']
})
export class PenznemListComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Pénznem'];

  eppFrissit = false;
  mod = false;
  penznemservice: PenznemService;

  constructor(private _logonservice: LogonService,
              private _penztarservice: PenztarService,
              private _projektservice: ProjektService,
              private _szamlazasirendservice: SzamlazasirendService,
              private _bizonylatkifizetesservice: BizonylatkifizetesService,
              private _bizonylatservice: BizonylatService,
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
        this.errormodal.show(err);
        this.eppFrissit = false;
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
      this._bizonylatkifizetesservice.SzerkesztesMode = BizonylatKifizetesSzerkesztesMode.Blank;
    }
    if (this.penznemservice.zoomsource === ZoomSources.Bizonylat) {
      this._bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.List;
    }
  }

  setClickedRow(i: number) {
    this.penznemservice.DtoSelectedIndex = i;
    this.penznemservice.uj = false;
    this.penznemservice.ContainerMode = PenznemContainerMode.Egy;
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
        this.errormodal.show(err);
      });
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

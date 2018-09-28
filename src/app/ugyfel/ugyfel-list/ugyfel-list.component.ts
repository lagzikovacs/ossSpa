import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {Szempont} from '../../enums/szempont';
import {UgyfelService} from '../ugyfel.service';
import {UgyfelDto} from '../ugyfeldto';
import {SzMT} from '../../dtos/szmt';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {ZoomSources} from '../../enums/zoomsources';
import {IratService} from '../../irat/irat/irat.service';
import {UgyfelContainerMode} from '../ugyfelcontainermode';
import {UgyfelEgyMode} from '../ugyfelegymode';
import {ProjektService} from '../../projekt/projekt/projekt.service';
import {ProjektSzerkesztesMode} from '../../projekt/projekt/projektszerkesztesmode';
import {IratSzerkesztesMode} from '../../irat/irat/iratszerkesztesmode';
import {BizonylatService} from '../../bizonylat/bizonylat.service';
import {BizonylatSzerkesztesMode} from '../../bizonylat/bizonylatszerkesztesmode';

@Component({
  selector: 'app-ugyfel-list',
  templateUrl: './ugyfel-list.component.html',
  styleUrls: ['./ugyfel-list.component.css']
})
export class UgyfelListComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Ügyfél', 'Email'];
  szempontok = [
    Szempont.Nev, Szempont.UgyfelEmail
  ];

  eppFrissit = false;
  mod = false;
  ugyfelservice: UgyfelService;

  constructor(private _logonservice: LogonService,
              private _iratservice: IratService,
              private _projektservice: ProjektService,
              private _bizonylatservice: BizonylatService,
              ugyfelservice: UgyfelService  ) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.UGYFELEKMOD]);
    this.ugyfelservice = ugyfelservice;
  }

  ngOnInit() {
    if (this.ugyfelservice.zoom) {
      this.onKereses();
    }
  }

  onKereses() {
    this.ugyfelservice.Dto = new Array<UgyfelDto>();
    this.ugyfelservice.DtoSelectedIndex = -1;
    this.ugyfelservice.OsszesRekord = 0;

    this.ugyfelservice.elsokereses = true;
    this.ugyfelservice.up.rekordtol = 0;
    this.ugyfelservice.up.fi = new Array<SzMT>();

    this.ugyfelservice.up.fi.push(new SzMT(this.szempontok[this.ugyfelservice.szempont], this.ugyfelservice.minta));

    this.onKeresesTovabb();
  }
  onKeresesTovabb() {
    this.eppFrissit = true;
    this.ugyfelservice.Select(this.ugyfelservice.up)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.ugyfelservice.elsokereses) {
          this.ugyfelservice.Dto = res.Result;
          this.ugyfelservice.elsokereses = false;
        } else {
          const buf = [...this.ugyfelservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.ugyfelservice.Dto = buf;
        }
        this.ugyfelservice.OsszesRekord = res.OsszesRekord;

        this.ugyfelservice.up.rekordtol += this.ugyfelservice.up.lapmeret;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  selectforzoom(i: number) {
    if (this.ugyfelservice.zoomsource === ZoomSources.Irat) {
      this._iratservice.DtoEdited.UGYFELKOD = this.ugyfelservice.Dto[i].UGYFELKOD;
      this._iratservice.DtoEdited.UGYFELNEV = this.ugyfelservice.Dto[i].NEV;
      this._iratservice.DtoEdited.UGYFELCIM = this.ugyfelservice.Dto[i].CIM;
    }
    if (this.ugyfelservice.zoomsource === ZoomSources.Projekt) {
      this._projektservice.DtoEdited.UGYFELKOD = this.ugyfelservice.Dto[i].UGYFELKOD;
      this._projektservice.DtoEdited.UGYFELNEV = this.ugyfelservice.Dto[i].NEV;
      this._projektservice.DtoEdited.UGYFELCIM = this.ugyfelservice.Dto[i].CIM;
    }
    if (this.ugyfelservice.zoomsource === ZoomSources.Bizonylat) {
      this._bizonylatservice.ComplexDtoEdited.Dto.UGYFELKOD = this.ugyfelservice.Dto[i].UGYFELKOD;
      this._bizonylatservice.ComplexDtoEdited.Dto.UGYFELNEV = this.ugyfelservice.Dto[i].NEV;
      this._bizonylatservice.ComplexDtoEdited.Dto.UGYFELCIM = this.ugyfelservice.Dto[i].CIM;

      this._bizonylatservice.ComplexDtoEdited.Dto.UGYFELADOSZAM = this.ugyfelservice.Dto[i].ADOSZAM;

      this._bizonylatservice.ComplexDtoEdited.Dto.UGYFELIRANYITOSZAM = this.ugyfelservice.Dto[i].IRANYITOSZAM;
      this._bizonylatservice.ComplexDtoEdited.Dto.UGYFELHELYSEGKOD = this.ugyfelservice.Dto[i].HELYSEGKOD;
      this._bizonylatservice.ComplexDtoEdited.Dto.UGYFELHELYSEGNEV = this.ugyfelservice.Dto[i].HELYSEGNEV;
      this._bizonylatservice.ComplexDtoEdited.Dto.UGYFELKOZTERULET = this.ugyfelservice.Dto[i].KOZTERULET;
      this._bizonylatservice.ComplexDtoEdited.Dto.UGYFELKOZTERULETTIPUS = this.ugyfelservice.Dto[i].KOZTERULETTIPUS;
      this._bizonylatservice.ComplexDtoEdited.Dto.UGYFELHAZSZAM = this.ugyfelservice.Dto[i].HAZSZAM;
    }

    this.stopzoom();
  }
  stopzoom() {
    this.ugyfelservice.zoom = false;

    if (this.ugyfelservice.zoomsource === ZoomSources.Irat) {
      this._iratservice.SzerkesztesMode = IratSzerkesztesMode.Blank;
    }
    if (this.ugyfelservice.zoomsource === ZoomSources.Projekt) {
      this._projektservice.SzerkesztesMode = ProjektSzerkesztesMode.Blank;
    }
    if (this.ugyfelservice.zoomsource === ZoomSources.Bizonylat) {
      this._bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.List;
    }
  }

  setClickedRow(i: number) {
    this.ugyfelservice.DtoSelectedIndex = i;
    this.ugyfelservice.uj = false;
    this.ugyfelservice.ContainerMode = UgyfelContainerMode.Egy;
    this.ugyfelservice.EgyMode = UgyfelEgyMode.Reszletek;
  }

  onUj() {
    this.eppFrissit = true;
    this.ugyfelservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.ugyfelservice.uj = true;
        this.ugyfelservice.DtoEdited = res.Result[0];
        this.ugyfelservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.ugyfelservice.ContainerMode = UgyfelContainerMode.Uj;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}

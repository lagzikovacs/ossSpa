import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CikkService} from '../cikk.service';
import {Szempont} from '../../enums/szempont';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {CikkDto} from '../cikkdto';
import {SzMT} from '../../dtos/szmt';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {CikkContainerMode} from '../cikkcontainermode';
import {CikkEgyMode} from '../cikkegymode';
import {ZoomSources} from '../../enums/zoomsources';
import {AjanlatSzerkesztesMode} from '../../projekt/ajanlat/ajanlatszerkesztesmode';
import {BizonylatService} from '../../bizonylat/bizonylat.service';
import {BizonylattetelSzerkesztesMode} from '../../bizonylat/bizonylattetelszerkesztesmode';
import {AjanlatService} from '../../projekt/ajanlat/ajanlat.service';

@Component({
  selector: 'app-cikk-list',
  templateUrl: './cikk-list.component.html',
  styleUrls: ['./cikk-list.component.css']
})
export class CikkListComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Megnevezés', 'Id'];
  szempontok = [
    Szempont.Megnevezes, Szempont.Kod
  ];

  eppFrissit = false;
  mod = false;
  cikkservice: CikkService;

  constructor(private _logonservice: LogonService,
              private _bizonylatservice: BizonylatService,
              private _ajanlatservice: AjanlatService,
              cikkservice: CikkService  ) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.CIKKMOD]);
    this.cikkservice = cikkservice;
  }

  ngOnInit() {
    if (this.cikkservice.zoom) {
      this.onKereses();
    }
  }

  onKereses() {
    this.cikkservice.Dto = new Array<CikkDto>();
    this.cikkservice.DtoSelectedIndex = -1;
    this.cikkservice.OsszesRekord = 0;

    this.cikkservice.elsokereses = true;
    this.cikkservice.up.rekordtol = 0;
    this.cikkservice.up.fi = new Array<SzMT>();

    this.cikkservice.up.fi.push(new SzMT(this.szempontok[this.cikkservice.szempont], this.cikkservice.minta));

    this.onKeresesTovabb();
  }
  onKeresesTovabb() {
    this.eppFrissit = true;
    this.cikkservice.Select(this.cikkservice.up)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.cikkservice.elsokereses) {
          this.cikkservice.Dto = res.Result;
          this.cikkservice.elsokereses = false;
        } else {
          const buf = [...this.cikkservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.cikkservice.Dto = buf;
        }
        this.cikkservice.OsszesRekord = res.OsszesRekord;

        this.cikkservice.up.rekordtol += this.cikkservice.up.lapmeret;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  selectforzoom(i: number) {
    if (this.cikkservice.zoomsource === ZoomSources.Ajanlat) {
      this._ajanlatservice.AjanlatParam.AjanlatBuf[this._ajanlatservice.AjanlattetelIndex].CikkKod =
        this.cikkservice.Dto[i].CIKKKOD;
      this._ajanlatservice.AjanlatParam.AjanlatBuf[this._ajanlatservice.AjanlattetelIndex].CikkNev =
        this.cikkservice.Dto[i].MEGNEVEZES;
      this._ajanlatservice.AjanlatParam.AjanlatBuf[this._ajanlatservice.AjanlattetelIndex].AfaMerteke =
        this.cikkservice.Dto[i].AFAMERTEKE;
      this._ajanlatservice.AjanlatParam.AjanlatBuf[this._ajanlatservice.AjanlattetelIndex].EgysegAr =
        this.cikkservice.Dto[i].EGYSEGAR;
    }
    if (this.cikkservice.zoomsource === ZoomSources.Bizonylattetel) {
      this._bizonylatservice.TetelDtoEdited.CIKKKOD = this.cikkservice.Dto[i].CIKKKOD;
      this._bizonylatservice.TetelDtoEdited.MEGNEVEZES = this.cikkservice.Dto[i].MEGNEVEZES;
      this._bizonylatservice.TetelDtoEdited.MEKOD = this.cikkservice.Dto[i].MEKOD;
      this._bizonylatservice.TetelDtoEdited.ME = this.cikkservice.Dto[i].ME;
      this._bizonylatservice.TetelDtoEdited.AFAKULCSKOD = this.cikkservice.Dto[i].AFAKULCSKOD;
      this._bizonylatservice.TetelDtoEdited.AFAKULCS = this.cikkservice.Dto[i].AFAKULCS;
      this._bizonylatservice.TetelDtoEdited.AFAMERTEKE = this.cikkservice.Dto[i].AFAMERTEKE;
      this._bizonylatservice.TetelDtoEdited.EGYSEGAR = this.cikkservice.Dto[i].EGYSEGAR;
      this._bizonylatservice.TetelDtoEdited.TOMEGKG = this.cikkservice.Dto[i].TOMEGKG;

      this._bizonylatservice.TetelDtoEdited.TERMEKDIJKOD = this.cikkservice.Dto[i].TERMEKDIJKOD;
      this._bizonylatservice.TetelDtoEdited.TERMEKDIJKT = this.cikkservice.Dto[i].TERMEKDIJKT;
      this._bizonylatservice.TetelDtoEdited.TERMEKDIJMEGNEVEZES = this.cikkservice.Dto[i].TERMEKDIJMEGNEVEZES;
      this._bizonylatservice.TetelDtoEdited.TERMEKDIJEGYSEGAR = this.cikkservice.Dto[i].TERMEKDIJEGYSEGAR;
    }

    this.stopzoom();
  }
  stopzoom() {
    this.cikkservice.zoom = false;

    if (this.cikkservice.zoomsource === ZoomSources.Ajanlat) {
      this._ajanlatservice.AjanlatSzerkesztesMode = AjanlatSzerkesztesMode.Blank;
    }
    if (this.cikkservice.zoomsource === ZoomSources.Bizonylattetel) {
      this._bizonylatservice.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;
    }
  }

  setClickedRow(i: number) {
    this.cikkservice.DtoSelectedIndex = i;
    this.cikkservice.uj = false;
    this.cikkservice.ContainerMode = CikkContainerMode.Egy;
    this.cikkservice.EgyMode = CikkEgyMode.Reszletek;
  }

  onUj() {
    this.eppFrissit = true;
    this.cikkservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.cikkservice.uj = true;
        this.cikkservice.DtoEdited = res.Result[0];
        this.cikkservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.cikkservice.ContainerMode = CikkContainerMode.Uj;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

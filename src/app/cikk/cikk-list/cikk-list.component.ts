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
import {AjanlatSzerkesztesMode} from '../../ajanlat/ajanlatszerkesztesmode';
import {BizonylatService} from '../../bizonylat/bizonylat.service';
import {BizonylattetelSzerkesztesMode} from '../../bizonylat/bizonylattetelszerkesztesmode';
import {AjanlatService} from '../../ajanlat/ajanlat.service';

@Component({
  selector: 'app-cikk-list',
  templateUrl: './cikk-list.component.html'
})
export class CikkListComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Megnevezés', 'Id'];
  szempontok = [
    Szempont.Megnevezes, Szempont.Kod
  ];

  eppFrissit = false;
  mod = false;
  ti = -1;

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

        if (this.cikkservice.zoom) {
          window.scrollTo(0, document.body.scrollHeight);
        }
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  selectforzoom(i: number) {
    if (this.cikkservice.zoomsource === ZoomSources.Ajanlat) {
      this._ajanlatservice.AjanlatParam.AjanlatBuf[this._ajanlatservice.AjanlattetelIndex].CikkKod =
        this.cikkservice.Dto[i].Cikkkod;
      this._ajanlatservice.AjanlatParam.AjanlatBuf[this._ajanlatservice.AjanlattetelIndex].CikkNev =
        this.cikkservice.Dto[i].Megnevezes;
      this._ajanlatservice.AjanlatParam.AjanlatBuf[this._ajanlatservice.AjanlattetelIndex].AfaMerteke =
        this.cikkservice.Dto[i].Afamerteke;
      this._ajanlatservice.AjanlatParam.AjanlatBuf[this._ajanlatservice.AjanlattetelIndex].EgysegAr =
        this.cikkservice.Dto[i].Egysegar;
    }
    if (this.cikkservice.zoomsource === ZoomSources.Bizonylattetel) {
      this._bizonylatservice.TetelDtoEdited.Cikkkod = this.cikkservice.Dto[i].Cikkkod;
      this._bizonylatservice.TetelDtoEdited.Megnevezes = this.cikkservice.Dto[i].Megnevezes;
      this._bizonylatservice.TetelDtoEdited.Mekod = this.cikkservice.Dto[i].Mekod;
      this._bizonylatservice.TetelDtoEdited.Me = this.cikkservice.Dto[i].Me;
      this._bizonylatservice.TetelDtoEdited.Afakulcskod = this.cikkservice.Dto[i].Afakulcskod;
      this._bizonylatservice.TetelDtoEdited.Afakulcs = this.cikkservice.Dto[i].Afakulcs;
      this._bizonylatservice.TetelDtoEdited.Afamerteke = this.cikkservice.Dto[i].Afamerteke;
      this._bizonylatservice.TetelDtoEdited.Egysegar = this.cikkservice.Dto[i].Egysegar;
      this._bizonylatservice.TetelDtoEdited.Tomegkg = this.cikkservice.Dto[i].Tomegkg;

      this._bizonylatservice.TetelDtoEdited.Termekdijkod = this.cikkservice.Dto[i].Termekdijkod;
      this._bizonylatservice.TetelDtoEdited.Termekdijkt = this.cikkservice.Dto[i].Termekdijkt;
      this._bizonylatservice.TetelDtoEdited.Termekdijmegnevezes = this.cikkservice.Dto[i].Termekdijmegnevezes;
      this._bizonylatservice.TetelDtoEdited.Termekdijegysegar = this.cikkservice.Dto[i].Termekdijegysegar;
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

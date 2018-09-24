import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {TermekdijService} from '../termekdij.service';
import {CikkService} from '../../cikk/cikk.service';
import {ZoomSources} from '../../enums/zoomsources';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {CikkSzerkesztesMode} from "../../cikk/cikkszerkesztesmode";
import {TermekdijEgyMode} from "../termekdijegymode";
import {TermekdijContainerMode} from "../termekdijcontainermode";
import {BizonylatService} from "../../bizonylat/bizonylat.service";
import {BizonylattetelSzerkesztesMode} from "../../bizonylat/bizonylattetelszerkesztesmode";

@Component({
  selector: 'app-termekdij-list',
  templateUrl: './termekdij-list.component.html',
  styleUrls: ['./termekdij-list.component.css']
})
export class TermekdijListComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['KT'];

  eppFrissit = false;
  mod = false;
  termekdijservice: TermekdijService;

  constructor(private _logonservice: LogonService,
              private _cikkservice: CikkService,
              private _bizonylatservice: BizonylatService,
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
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  selectforzoom(i: number) {
    if (this.termekdijservice.zoomsource === ZoomSources.Cikk) {
      this._cikkservice.DtoEdited.TERMEKDIJKOD = this.termekdijservice.Dto[i].TERMEKDIJKOD;
      this._cikkservice.DtoEdited.TERMEKDIJKT = this.termekdijservice.Dto[i].TERMEKDIJKT;
      this._cikkservice.DtoEdited.TERMEKDIJMEGNEVEZES = this.termekdijservice.Dto[i].TERMEKDIJMEGNEVEZES;
      this._cikkservice.DtoEdited.TERMEKDIJEGYSEGAR = this.termekdijservice.Dto[i].TERMEKDIJEGYSEGAR;
    }
    if (this.termekdijservice.zoomsource === ZoomSources.Bizonylattetel) {
      this._bizonylatservice.TetelDtoEdited.TERMEKDIJKOD = this.termekdijservice.Dto[i].TERMEKDIJKOD;
      this._bizonylatservice.TetelDtoEdited.TERMEKDIJKT = this.termekdijservice.Dto[i].TERMEKDIJKT;
      this._bizonylatservice.TetelDtoEdited.TERMEKDIJMEGNEVEZES = this.termekdijservice.Dto[i].TERMEKDIJMEGNEVEZES;
      this._bizonylatservice.TetelDtoEdited.TERMEKDIJEGYSEGAR = this.termekdijservice.Dto[i].TERMEKDIJEGYSEGAR;
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
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}

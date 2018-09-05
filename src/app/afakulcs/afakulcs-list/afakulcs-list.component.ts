import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {AfakulcsService} from '../afakulcs.service';
import {CikkService} from '../../cikk/cikk.service';
import {ZoomSources} from '../../enums/zoomsources';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {CikkSzerkesztesMode} from "../../cikk/cikkszerkesztesmode";
import {AfakulcsContainerMode} from "../afakulcscontainermode";
import {AfakulcsEgyMode} from "../afakulcsegymode";

@Component({
  selector: 'app-afakulcs-list',
  templateUrl: './afakulcs-list.component.html',
  styleUrls: ['./afakulcs-list.component.css']
})
export class AfakulcsListComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['ÁFA kulcs'];

  eppFrissit = false;
  mod = false;
  afakulcsservice: AfakulcsService;

  constructor(private _logonservice: LogonService,
              afakulcsservice: AfakulcsService,
              private _cikkservice: CikkService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.afakulcsservice = afakulcsservice;
  }

  ngOnInit() {
    if (this.afakulcsservice.zoom) {
      this.onKereses();
    }
  }

  onKereses() {
    this.afakulcsservice.elsokereses = true;
    this.afakulcsservice.ekDto.rekordtol = 0;

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.afakulcsservice.Read(this.afakulcsservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.afakulcsservice.elsokereses) {
          this.afakulcsservice.Dto = res.Result;
          this.afakulcsservice.elsokereses = false;
        } else {
          const buf = [...this.afakulcsservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.afakulcsservice.Dto = buf;
        }

        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  selectforzoom(i: number) {
    if (this.afakulcsservice.zoomsource === ZoomSources.Cikk) {
      this._cikkservice.DtoEdited.AFAKULCSKOD = this.afakulcsservice.Dto[i].AFAKULCSKOD;
      this._cikkservice.DtoEdited.AFAKULCS = this.afakulcsservice.Dto[i].AFAKULCS1;
      this._cikkservice.DtoEdited.AFAMERTEKE = this.afakulcsservice.Dto[i].AFAMERTEKE;

      this.stopzoom();
    }
  }
  stopzoom() {
    this.afakulcsservice.zoom = false;

    this._cikkservice.SzerkesztesMode = CikkSzerkesztesMode.Blank;
  }

  setClickedRow(i: number) {
    this.afakulcsservice.DtoSelectedIndex = i;
    this.afakulcsservice.uj = false;
    this.afakulcsservice.ContainerMode = AfakulcsContainerMode.Egy;
    this.afakulcsservice.EgyMode = AfakulcsEgyMode.Reszletek;
  }

  uj() {
    this.eppFrissit = true;
    this.afakulcsservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.afakulcsservice.uj = true;
        this.afakulcsservice.DtoEdited = res.Result[0];
        this.afakulcsservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.afakulcsservice.ContainerMode = AfakulcsContainerMode.Uj;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}

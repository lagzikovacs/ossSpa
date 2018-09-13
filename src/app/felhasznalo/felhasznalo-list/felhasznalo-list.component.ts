import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {FelhasznaloService} from '../felhasznalo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {ZoomSources} from '../../enums/zoomsources';
import {ProjektteendoService} from '../../projekt/projektteendo/projektteendo.service';
import {FelhasznaloContainerMode} from "../felhasznalocontainermode";
import {FelhasznaloEgyMode} from "../felhasznaloegymode";
import {ProjektteendoSzerkesztesMode} from "../../projekt/projektteendo/projektteendoszerkesztesmode";

@Component({
  selector: 'app-felhasznalo-list',
  templateUrl: './felhasznalo-list.component.html',
  styleUrls: ['./felhasznalo-list.component.css']
})
export class FelhasznaloListComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Név'];

  eppFrissit = false;
  mod = false;
  felhasznaloservice: FelhasznaloService;

  constructor(private _logonservice: LogonService,
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
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  selectforzoom(i: number) {
    if (this.felhasznaloservice.zoomsource === ZoomSources.Projektteendo) {
      this._projektteendoservice.DtoEdited.DEDIKALVA = this.felhasznaloservice.Dto[i].NEV;

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
    this.felhasznaloservice.ContainerMode = FelhasznaloContainerMode.Egy;
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
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}

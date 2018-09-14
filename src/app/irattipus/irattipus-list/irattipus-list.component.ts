import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {IrattipusService} from '../irattipus.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {ZoomSources} from '../../enums/zoomsources';
import {ProjektkapcsolatService} from '../../projekt/bizonylatesirat/projektkapcsolat.service';
import {IratService} from '../../irat/irat/irat.service';
import {IrattipusEgyMode} from '../irattipusegymode';
import {IrattipusContainerMode} from '../irattipuscontainermode';
import {IratSzerkesztesMode} from '../../irat/irat/iratszerkesztesmode';
import {BizonylatesiratSzerkesztesMode} from '../../projekt/bizonylatesirat/bizonylatesiratszerkesztesmode';
import {BizonylatkapcsolatService} from "../../bizonylat/bizonylatirat/bizonylatkapcsolat.service";
import {BizonylatKapcsolatSzerkesztesMode} from "../../bizonylat/bizonylatirat/bizonylatkapcsolatszerkesztesmode";

@Component({
  selector: 'app-irattipus-list',
  templateUrl: './irattipus-list.component.html',
  styleUrls: ['./irattipus-list.component.css']
})
export class IrattipusListComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Irattipus'];

  eppFrissit = false;
  mod = false;
  irattipusservice: IrattipusService;

  constructor(private _logonservice: LogonService,
              private _iratservice: IratService,
              private _projektkapcsolatservice: ProjektkapcsolatService,
              private _bizonylatkapcsolatservice: BizonylatkapcsolatService,
              irattipusservice: IrattipusService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.irattipusservice = irattipusservice;
  }

  ngOnInit() {
    if (this.irattipusservice.zoom) {
      this.onKereses();
    }
  }

  onKereses() {
    this.irattipusservice.elsokereses = true;
    this.irattipusservice.ekDto.rekordtol = 0;

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.irattipusservice.Read(this.irattipusservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.irattipusservice.elsokereses) {
          this.irattipusservice.Dto = res.Result;
          this.irattipusservice.elsokereses = false;
        } else {
          const buf = [...this.irattipusservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.irattipusservice.Dto = buf;
        }

        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  selectforzoom(i: number) {
    if (this.irattipusservice.zoomsource === ZoomSources.Irat) {
      this._iratservice.DtoEdited.IRATTIPUSKOD = this.irattipusservice.Dto[i].IRATTIPUSKOD;
      this._iratservice.DtoEdited.IRATTIPUS = this.irattipusservice.Dto[i].IRATTIPUS1;

      this.stopzoom();
    }
    if (this.irattipusservice.zoomsource === ZoomSources.Projektirat) {
      this._projektkapcsolatservice.UjIratDto.IRATTIPUSKOD = this.irattipusservice.Dto[i].IRATTIPUSKOD;
      this._projektkapcsolatservice.UjIratDto.IRATTIPUS = this.irattipusservice.Dto[i].IRATTIPUS1;

      this.stopzoom();
    }
    if (this.irattipusservice.zoomsource === ZoomSources.Bizonylatirat) {
      this._bizonylatkapcsolatservice.UjIratDto.IRATTIPUSKOD = this.irattipusservice.Dto[i].IRATTIPUSKOD;
      this._bizonylatkapcsolatservice.UjIratDto.IRATTIPUS = this.irattipusservice.Dto[i].IRATTIPUS1;

      this.stopzoom();
    }
  }
  stopzoom() {
    this.irattipusservice.zoom = false;

    if (this.irattipusservice.zoomsource === ZoomSources.Irat) {
      this._iratservice.SzerkesztesMode = IratSzerkesztesMode.Blank;
    }
    if (this.irattipusservice.zoomsource === ZoomSources.Projektirat) {
      this._projektkapcsolatservice.SzerkesztesMode = BizonylatesiratSzerkesztesMode.Blank;
    }
    if (this.irattipusservice.zoomsource === ZoomSources.Bizonylatirat) {
      this._bizonylatkapcsolatservice.SzerkesztesMode = BizonylatKapcsolatSzerkesztesMode.Blank;
    }
  }

  setClickedRow(i: number) {
    this.irattipusservice.DtoSelectedIndex = i;
    this.irattipusservice.uj = false;
    this.irattipusservice.ContainerMode = IrattipusContainerMode.Egy;
    this.irattipusservice.EgyMode = IrattipusEgyMode.Reszletek;
  }

  uj() {
    this.eppFrissit = true;
    this.irattipusservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.irattipusservice.uj = true;
        this.irattipusservice.DtoEdited = res.Result[0];
        this.irattipusservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.irattipusservice.ContainerMode = IrattipusContainerMode.Uj;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}

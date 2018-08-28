import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {IrattipusService} from '../../../services/torzs/primitiv/irattipus.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LogonService} from '../../../services/segedeszkosz/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {ZoomSources} from '../../../enums/zoomsources';
import {ProjektkapcsolatService} from '../../../services/eszkoz/projekt/projektkapcsolat.service';
import {IratService} from "../../../services/eszkoz/irat/irat.service";

@Component({
  selector: 'app-irattipus',
  templateUrl: './irattipus.component.html',
  styleUrls: ['./irattipus.component.css']
})
export class IrattipusComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Irattipus'];

  eppFrissit = false;
  mod = false;
  irattipusservice: IrattipusService;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
              private _iratservice: IratService,
              private _projektkapcsolatservice: ProjektkapcsolatService,
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
  }
  stopzoom() {
    this.irattipusservice.zoom = false;
    this._router.navigate(['../blank'], {relativeTo: this._route});
  }

  setClickedRow(i: number) {
    this.irattipusservice.DtoSelectedIndex = i;
    this.irattipusservice.uj = false;
    this._router.navigate(['../irattipusegy'], {relativeTo: this._route});
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

        this._router.navigate(['../irattipusuj'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}

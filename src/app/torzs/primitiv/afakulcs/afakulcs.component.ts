import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {AfakulcsService} from '../../../services/torzs/primitiv/afakulcs.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CikkService} from '../../../services/torzs/cikk.service';
import {ZoomSources} from '../../../enums/zoomsources';
import {LogonService} from "../../../services/segedeszkosz/logon.service";
import {JogKod} from "../../../enums/jogkod";

@Component({
  selector: 'app-afakulcs',
  templateUrl: './afakulcs.component.html',
  styleUrls: ['./afakulcs.component.css']
})
export class AfakulcsComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['ÁFA kulcs'];

  eppFrissit = false;
  mod = false;
  afakulcsservice: AfakulcsService;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
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
    this._router.navigate(['../blank'], {relativeTo: this._route});
  }

  setClickedRow(i: number) {
    this.afakulcsservice.DtoSelectedIndex = i;
    this.afakulcsservice.uj = false;
    this._router.navigate(['../afakulcsegy/reszletek'], {relativeTo: this._route});
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

        this._router.navigate(['../afakulcsuj'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {PenznemService} from '../../../services/torzs/primitiv/penznem.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {PenztarService} from '../../../services/eszkoz/penztar.service';
import {ZoomSources} from "../../../enums/zoomsources";
import {LogonService} from "../../../services/segedeszkosz/logon.service";
import {JogKod} from "../../../enums/jogkod";

@Component({
  selector: 'app-penznem',
  templateUrl: './penznem.component.html',
  styleUrls: ['./penznem.component.css']
})
export class PenznemComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Pénznem'];

  eppFrissit = false;
  mod = false;
  penznemservice: PenznemService;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
              penznemservice: PenznemService,
              private _penztarservice: PenztarService) {
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
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  selectforzoom(i: number) {
    if (this.penznemservice.zoomsource === ZoomSources.Penztar) {
      this._penztarservice.DtoEdited.PENZNEMKOD = this.penznemservice.Dto[i].PENZNEMKOD;
      this._penztarservice.DtoEdited.PENZNEM = this.penznemservice.Dto[i].PENZNEM1;

      this.stopzoom();
    }
  }
  stopzoom() {
    this.penznemservice.zoom = false;
    this._router.navigate(['../blank'], {relativeTo: this._route});
  }

  setClickedRow(i: number) {
    this.penznemservice.DtoSelectedIndex = i;
    this.penznemservice.uj = false;
    this._router.navigate(['../penznemegy'], {relativeTo: this._route});
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

        this._router.navigate(['../penznemuj'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}

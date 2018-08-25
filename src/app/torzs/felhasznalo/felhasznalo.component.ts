import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {FelhasznaloService} from '../../services/torzs/primitiv/felhasznalo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LogonService} from '../../services/segedeszkosz/logon.service';
import {JogKod} from '../../enums/jogkod';
import {ZoomSources} from '../../enums/zoomsources';
import {ProjektteendoService} from '../../services/eszkoz/projekt/projektteendo.service';

@Component({
  selector: 'app-felhasznalo',
  templateUrl: './felhasznalo.component.html',
  styleUrls: ['./felhasznalo.component.css']
})
export class FelhasznaloComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Név'];

  eppFrissit = false;
  mod = false;
  felhasznaloservice: FelhasznaloService;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
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
    this._router.navigate(['../blank'], {relativeTo: this._route});
  }

  setClickedRow(i: number) {
    this.felhasznaloservice.DtoSelectedIndex = i;
    this.felhasznaloservice.uj = false;
    this._router.navigate(['../felhasznaloegy'], {relativeTo: this._route});
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

        this._router.navigate(['../felhasznalouj'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}

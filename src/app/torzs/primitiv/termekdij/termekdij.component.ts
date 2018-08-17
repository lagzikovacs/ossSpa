import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {TermekdijService} from '../../../services/torzs/primitiv/termekdij.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CikkService} from '../../../services/torzs/cikk.service';
import {ZoomSources} from '../../../enums/zoomsources';
import {LogonService} from "../../../services/segedeszkosz/logon.service";
import {JogKod} from "../../../enums/jogkod";

@Component({
  selector: 'app-termekdij',
  templateUrl: './termekdij.component.html',
  styleUrls: ['./termekdij.component.css']
})
export class TermekdijComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['KT'];

  eppFrissit = false;
  mod = false;
  termekdijservice: TermekdijService;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
              termekdijservice: TermekdijService,
              private _cikkservice: CikkService) {
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

      this.stopzoom();
    }
  }
  stopzoom() {
    this.termekdijservice.zoom = false;
    this._router.navigate(['../blank'], {relativeTo: this._route});
  }

  setClickedRow(i: number) {
    this.termekdijservice.DtoSelectedIndex = i;
    this.termekdijservice.uj = false;
    this._router.navigate(['../termekdijegy/reszletek'], {relativeTo: this._route});
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

        this._router.navigate(['../termekdijuj'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}

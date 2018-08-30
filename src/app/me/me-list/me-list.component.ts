import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {MeService} from '../me.service';
import {ZoomSources} from '../../enums/zoomsources';
import {CikkService} from '../../cikk/cikk.service';
import {LogonService} from '../../services/logon.service';
import {JogKod} from '../../enums/jogkod';
import {CikkSzerkesztesMode} from '../../cikk/cikkszerkesztesmode';
import {MeEgyMode} from '../meegymode';
import {MeContainerMode} from '../mecontainermode';

@Component({
  selector: 'app-me-list',
  templateUrl: './me-list.component.html',
  styleUrls: ['./me-list.component.css']
})
export class MeListComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Mennyiségi egység'];

  eppFrissit = false;
  mod = false;
  meservice: MeService;

  constructor(private _logonservice: LogonService,
              meservice: MeService,
              private _cikkservice: CikkService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.meservice = meservice;
  }

  ngOnInit() {
    if (this.meservice.zoom) {
      this.onKereses();
    }
  }

  onKereses() {
    this.meservice.elsokereses = true;
    this.meservice.ekDto.rekordtol = 0;

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.meservice.Read(this.meservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.meservice.elsokereses) {
          this.meservice.Dto = res.Result;
          this.meservice.elsokereses = false;
        } else {
          const buf = [...this.meservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.meservice.Dto = buf;
        }

        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  selectforzoom(i: number) {
    if (this.meservice.zoomsource === ZoomSources.Cikk) {
      this._cikkservice.DtoEdited.MEKOD = this.meservice.Dto[i].MEKOD;
      this._cikkservice.DtoEdited.ME = this.meservice.Dto[i].ME;

      this.stopzoom();
    }
  }
  stopzoom() {
    this.meservice.zoom = false;

    this._cikkservice.SzerkesztesMode = CikkSzerkesztesMode.Blank;
  }

  setClickedRow(i: number) {
    this.meservice.DtoSelectedIndex = i;
    this.meservice.uj = false;
    this.meservice.ContainerMode = MeContainerMode.Egy;
    this.meservice.EgyMode = MeEgyMode.Reszletek;
  }

  uj() {
    this.eppFrissit = true;
    this.meservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.meservice.uj = true;
        this.meservice.DtoEdited = res.Result[0];
        this.meservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.meservice.ContainerMode = MeContainerMode.Uj;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}
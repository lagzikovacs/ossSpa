import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {FizetesimodService} from '../fizetesimod.service';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {FizetesimodContainerMode} from '../fizetesimodcontainermode';
import {FizetesimodEgyMode} from '../fizetesimodegymode';
import {ZoomSources} from '../../enums/zoomsources';
import {BizonylatkifizetesService} from '../../bizonylat/bizonylatkifizetes/bizonylatkifizetes.service';
import {BizonylatKifizetesSzerkesztesMode} from '../../bizonylat/bizonylatkifizetes/bizonylatkifizetesszerkesztesmode';

@Component({
  selector: 'app-fizetesimod-list',
  templateUrl: './fizetesimod-list.component.html',
  styleUrls: ['./fizetesimod-list.component.css']
})
export class FizetesimodListComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Fizetési mód'];

  eppFrissit = false;
  mod = false;
  fizetesimodservice: FizetesimodService;

  constructor(private _logonservice: LogonService,
              private _bizonylatkifizetesservice: BizonylatkifizetesService,
              fizetesimodservice: FizetesimodService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.fizetesimodservice = fizetesimodservice;
  }

  ngOnInit() {
    if (this.fizetesimodservice.zoom) {
      this.onKereses();
    }
  }

  onKereses() {
    this.fizetesimodservice.elsokereses = true;
    this.fizetesimodservice.ekDto.rekordtol = 0;

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.fizetesimodservice.Read(this.fizetesimodservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.fizetesimodservice.elsokereses) {
          this.fizetesimodservice.Dto = res.Result;
          this.fizetesimodservice.elsokereses = false;
        } else {
          const buf = [...this.fizetesimodservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.fizetesimodservice.Dto = buf;
        }

        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  selectforzoom(i: number) {
    if (this.fizetesimodservice.zoomsource === ZoomSources.Bizonylatkifizetes) {
      this._bizonylatkifizetesservice.DtoEdited.FIZETESIMODKOD = this.fizetesimodservice.Dto[i].FIZETESIMODKOD;
      this._bizonylatkifizetesservice.DtoEdited.FIZETESIMOD = this.fizetesimodservice.Dto[i].FIZETESIMOD1;
    }

    this.stopzoom();
  }
  stopzoom() {
    this.fizetesimodservice.zoom = false;

    if (this.fizetesimodservice.zoomsource === ZoomSources.Bizonylatkifizetes) {
      this._bizonylatkifizetesservice.SzerkesztesMode = BizonylatKifizetesSzerkesztesMode.Blank;
    }
  }

  setClickedRow(i: number) {
    this.fizetesimodservice.DtoSelectedIndex = i;
    this.fizetesimodservice.uj = false;
    this.fizetesimodservice.ContainerMode = FizetesimodContainerMode.Egy;
    this.fizetesimodservice.EgyMode = FizetesimodEgyMode.Reszletek;
  }

  uj() {
    this.eppFrissit = true;
    this.fizetesimodservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.fizetesimodservice.uj = true;
        this.fizetesimodservice.DtoEdited = res.Result[0];
        this.fizetesimodservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.fizetesimodservice.ContainerMode = FizetesimodContainerMode.Uj;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}

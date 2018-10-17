import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PenztarService} from '../penztar.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {PenztartetelService} from '../penztartetel/penztartetel.service';
import {PenztartetelDto} from '../penztartetel/penztarteteldto';
import {PenztarContainerMode} from '../penztarcontainermode';
import {PenztarEgyMode} from '../penztaregymode';
import {PenztartetelContainerMode} from '../penztartetel/penztartetelcontainermode';
import {PenztarSzerkesztesMode} from '../penztarszerkesztesmode';

@Component({
  selector: 'app-penztar-list',
  templateUrl: './penztar-list.component.html',
  styleUrls: ['./penztar-list.component.css']
})
export class PenztarListComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Pénztár'];

  eppFrissit = false;
  mod = false;
  penztarservice: PenztarService;

  constructor(private _logonservice: LogonService,
              penztarservice: PenztarService,
              private _penztartetelservice: PenztartetelService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PENZTARMOD]);
    this.penztarservice = penztarservice;
  }

  ngOnInit() {
    this.onKereses();
  }

  onKereses() {
    this.penztarservice.elsokereses = true;
    this.penztarservice.ekDto.rekordtol = 0;

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.penztarservice.Read(this.penztarservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.penztarservice.elsokereses) {
          this.penztarservice.Dto = res.Result;
          this.penztarservice.elsokereses = false;
        } else {
          const buf = [...this.penztarservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.penztarservice.Dto = buf;
        }

        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  selectforzoom(i: number) {
    this.setClickedRow(i);
  }

  setClickedRow(i: number) {
    this.penztarservice.DtoSelectedIndex = i;
    this.penztarservice.uj = false;
    this._penztartetelservice.Dto = new Array<PenztartetelDto>();
    this._penztartetelservice.elsokereses = true;
    this._penztartetelservice.OsszesRekord = 0;
    this.penztarservice.ContainerMode = PenztarContainerMode.Egy;
    this.penztarservice.EgyMode = PenztarEgyMode.Tetelek;
    this._penztartetelservice.ContainerMode = PenztartetelContainerMode.List;
  }

  uj() {
    this.eppFrissit = true;
    this.penztarservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.penztarservice.uj = true;
        this.penztarservice.DtoEdited = res.Result[0];
        this.penztarservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.penztarservice.ContainerMode = PenztarContainerMode.Uj;
        this.penztarservice.SzerkesztesMode = PenztarSzerkesztesMode.Blank;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {PenztarService} from '../../services/eszkoz/penztar/penztar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {LogonService} from '../../services/logon.service';
import {JogKod} from '../../enums/jogkod';
import {PenztartetelService} from '../../services/eszkoz/penztar/penztartetel.service';
import {PenztartetelDto} from '../../dtos/penztar/penztarteteldto';

@Component({
  selector: 'app-penztar',
  templateUrl: './penztar.component.html',
  styleUrls: ['./penztar.component.css']
})
export class PenztarComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Pénztár'];

  eppFrissit = false;
  mod = false;
  penztarservice: PenztarService;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
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
    this._router.navigate(['../penztaregy/tetelek'], {relativeTo: this._route});
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

        this._router.navigate(['../penztaruj'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}

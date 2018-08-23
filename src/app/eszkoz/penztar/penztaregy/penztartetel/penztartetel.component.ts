import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';
import {PenztarService} from '../../../../services/eszkoz/penztar/penztar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LogonService} from '../../../../services/segedeszkosz/logon.service';
import {JogKod} from '../../../../enums/jogkod';
import {PenztartetelService} from '../../../../services/eszkoz/penztar/penztartetel.service';
import {Szempont} from '../../../../enums/szempont';
import {SzMT} from '../../../../dtos/szmt';

@Component({
  selector: 'app-penztartetel',
  templateUrl: './penztartetel.component.html',
  styleUrls: ['./penztartetel.component.css']
})
export class PenztartetelComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Id', 'Pénztárbizonylatszám', 'Ügyfél', 'Bizonylatszám'];
  szempontok = [
    Szempont.Kod, Szempont.PenztarBizonylatszam, Szempont.Ugyfel, Szempont.Bizonylatszam
  ];

  eppFrissit = false;
  mod = false;
  nyitva = false;
  penztarservice: PenztarService;
  penztartetelservice: PenztartetelService;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _logonservice: LogonService,
              penztarservice: PenztarService,
              penztartetelservice: PenztartetelService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PENZTARMOD]);
    this.penztarservice = penztarservice;
    this.penztartetelservice = penztartetelservice;
    this.nyitva = this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex].NYITVA;
  }

  onKereses() {
    this.penztartetelservice.elsokereses = true;
    this.penztartetelservice.ptp.rekordtol = 0;
    this.penztartetelservice.ptp.fi = new Array();
    this.penztartetelservice.ptp.fi.push(new SzMT(Szempont.SzuloKod,
      this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex].PENZTARKOD.toString()));
    this.penztartetelservice.ptp.fi.push(new SzMT(this.szempontok[this.penztartetelservice.szempont],
      this.penztartetelservice.minta));

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.penztartetelservice.Select(this.penztartetelservice.ptp)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.penztartetelservice.elsokereses) {
          this.penztartetelservice.Dto = res.Result;
          this.penztartetelservice.elsokereses = false;
        } else {
          const buf = [...this.penztartetelservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.penztartetelservice.Dto = buf;
        }
        this.penztartetelservice.OsszesRekord = res.OsszesRekord;

        this.penztartetelservice.ptp.rekordtol += this.penztartetelservice.ptp.lapmeret;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  onUj() {
    this.eppFrissit = true;
    this.penztartetelservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.penztartetelservice.DtoEdited = res.Result[0];
        this.penztartetelservice.uj = true;
        this.eppFrissit = false;
        this._router.navigate(['../tetelszerkesztes'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}

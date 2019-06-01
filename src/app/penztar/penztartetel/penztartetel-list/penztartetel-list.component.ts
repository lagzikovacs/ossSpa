import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {PenztarService} from '../../penztar.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {PenztartetelService} from '../penztartetel.service';
import {Szempont} from '../../../enums/szempont';
import {SzMT} from '../../../dtos/szmt';
import {PenztartetelContainerMode} from '../penztartetelcontainermode';

@Component({
  selector: 'app-penztartetel-list',
  templateUrl: './penztartetel-list.component.html',
  styleUrls: ['./penztartetel-list.component.css']
})
export class PenztartetelListComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Id', 'Pénztárbizonylatszám', 'Ügyfél', 'Bizonylatszám'];
  szempontok = [
    Szempont.Kod, Szempont.PenztarBizonylatszam, Szempont.Ugyfel, Szempont.Bizonylatszam
  ];

  eppFrissit = false;
  mod = false;
  elsokereses = true;
  nyitva = false;
  penztarservice: PenztarService;
  penztartetelservice: PenztartetelService;

  constructor(private _logonservice: LogonService,
              penztarservice: PenztarService,
              penztartetelservice: PenztartetelService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PENZTARMOD]);
    this.penztarservice = penztarservice;
    this.penztartetelservice = penztartetelservice;
    this.nyitva = this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex].Nyitva;
  }

  onKereses() {
    this.elsokereses = true;
    this.penztartetelservice.ptp.rekordtol = 0;
    this.penztartetelservice.ptp.fi = new Array();
    this.penztartetelservice.ptp.fi.push(new SzMT(Szempont.SzuloKod,
      this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex].Penztarkod.toString()));
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

        if (this.elsokereses) {
          this.penztartetelservice.Dto = res.Result;
          this.elsokereses = false;
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
        this.penztartetelservice.ContainerMode = PenztartetelContainerMode.Uj;
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

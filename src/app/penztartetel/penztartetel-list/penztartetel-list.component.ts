import {Component, OnDestroy, ViewChild} from '@angular/core';
import {PenztarService} from '../../penztar/penztar.service';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {PenztartetelService} from '../penztartetel.service';
import {Szempont} from '../../enums/szempont';
import {SzMT} from '../../dtos/szmt';
import {PenztartetelContainerMode} from '../penztartetelcontainermode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';

@Component({
  selector: 'app-penztartetel-list',
  templateUrl: './penztartetel-list.component.html'
})
export class PenztartetelListComponent implements OnDestroy {
  @ViewChild('tabla') tabla: TablaComponent;

  szurok = ['Id', 'Pénztárbizonylatszám', 'Ügyfél', 'Bizonylatszám'];
  szempontok = [
    Szempont.Kod, Szempont.PenztarBizonylatszam, Szempont.Ugyfel, Szempont.Bizonylatszam
  ];

  mod = false;
  nyitva = false;
  penztarservice: PenztarService;
  penztartetelservice: PenztartetelService;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              penztarservice: PenztarService,
              penztartetelservice: PenztartetelService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PENZTARMOD]);
    this.penztarservice = penztarservice;
    this.penztartetelservice = penztartetelservice;
    this.nyitva = this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex].Nyitva;
  }

  onKereses() {
    this.penztartetelservice.elsokereses = true;
    this.penztartetelservice.ptp.rekordtol = 0;
    this.penztartetelservice.ptp.fi = new Array();
    this.penztartetelservice.ptp.fi.push(new SzMT(Szempont.SzuloKod,
      this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex].Penztarkod.toString()));
    this.penztartetelservice.ptp.fi.push(new SzMT(this.szempontok[this.penztartetelservice.szempont],
      this.penztartetelservice.minta));

    this.tabla.clearselections();

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
        this.eppFrissit = false;
        this._errorservice.Error = err;
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
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

import {Component, OnDestroy, ViewChild} from '@angular/core';
import {PenztarService} from '../../penztar/penztar.service';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {PenztartetelService} from '../penztartetel.service';
import {Szempont} from '../../enums/szempont';
import {SzMT} from '../../dtos/szmt';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';
import {environment} from '../../../environments/environment';
import {PenztartetelParameter} from '../penztartetelparameter';

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

  jog = false;
  nyitva = false;
  szempont = 0;
  minta = '';
  elsokereses = true;
  ptp = new PenztartetelParameter(0, environment.lapmeret);
  OsszesRekord = 0;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  penztarservice: PenztarService;
  penztartetelservice: PenztartetelService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              penztarservice: PenztarService,
              penztartetelservice: PenztartetelService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.PENZTARMOD]);
    this.penztarservice = penztarservice;
    this.penztartetelservice = penztartetelservice;
    this.nyitva = this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex].Nyitva;
  }

  onKereses() {
    this.elsokereses = true;
    this.ptp.rekordtol = 0;
    this.ptp.fi = new Array();
    this.ptp.fi.push(new SzMT(Szempont.SzuloKod, this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex].Penztarkod.toString()));
    this.ptp.fi.push(new SzMT(this.szempontok[this.szempont], this.minta));

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.penztartetelservice.Select(this.ptp)
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
        this.OsszesRekord = res.OsszesRekord;

        this.ptp.rekordtol += this.ptp.lapmeret;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onUj() {
    this.tabla.ujtetelstart();
  }

  onUjkesz() {
    this.tabla.ujtetelstop();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

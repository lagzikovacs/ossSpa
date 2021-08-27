import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {PenztartetelService} from '../penztartetel.service';
import {Szempont} from '../../enums/szempont';
import {SzMT} from '../../dtos/szmt';
import {ErrorService} from '../../tools/errorbox/error.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';
import {environment} from '../../../environments/environment';
import {PenztartetelParameter} from '../penztartetelparameter';
import {PenztartetelDto} from '../penztarteteldto';

@Component({
  selector: 'app-penztartetel-list',
  templateUrl: './penztartetel-list.component.html'
})
export class PenztartetelListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaComponent;

  @Input() Penztarkod = -1;
  @Input() nyitva = false;
  @Output() eventFrissits = new EventEmitter();

  szurok = ['Id', 'Pénztárbizonylatszám', 'Ügyfél', 'Bizonylatszám'];
  szempontok = [
    Szempont.Kod, Szempont.PenztarBizonylatszam, Szempont.Ugyfel, Szempont.Bizonylatszam
  ];

  jog = false;
  szempont = 0;
  minta = '';
  elsokereses = true;
  ptp = new PenztartetelParameter(0, environment.lapmeret);
  OsszesRekord = 0;
  eppFrissit = false;

  Dto = new Array<PenztartetelDto>();

  penztartetelservice: PenztartetelService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              penztartetelservice: PenztartetelService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.PENZTARMOD]);

    this.penztartetelservice = penztartetelservice;
  }

  ngOnInit() {
    this.onKereses();
  }

  onKereses() {
    this.elsokereses = true;
    this.ptp.rekordtol = 0;
    this.ptp.fi = new Array();
    this.ptp.fi.push(new SzMT(Szempont.SzuloKod, this.Penztarkod.toString()));
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
          this.Dto = res.Result;
          this.elsokereses = false;
        } else {
          const buf = [...this.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.Dto = buf;
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


  doUjtetel() {
    this.tabla.ujtetelstart();
  }
  onUjtetelkesz(dto: PenztartetelDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
      this.eventFrissits.emit();
    }
    this.tabla.ujtetelstop();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

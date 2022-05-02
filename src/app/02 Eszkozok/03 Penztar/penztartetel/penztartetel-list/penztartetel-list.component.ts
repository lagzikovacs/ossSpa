import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild
} from '@angular/core';
import {LogonService} from '../../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {JogKod} from '../../../../common/enums/jogkod';
import {PenztartetelService} from '../penztartetel.service';
import {Szempont} from '../../../../common/enums/szempont';
import {SzMT} from '../../../../common/dtos/szmt';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {environment} from '../../../../../environments/environment';
import {PenztartetelParam} from '../penztartetelparam';
import {PenztartetelDto} from '../penztarteteldto';
import {TablaExComponent} from '../../../../common/tabla-ex/tabla-ex.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-penztartetel-list',
  templateUrl: './penztartetel-list.component.html'
})
export class PenztartetelListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaExComponent;

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
  ptp = new PenztartetelParam(0, environment.lapmeret);
  OsszesRekord = 0;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  Dto = new Array<PenztartetelDto>();

  penztartetelservice: PenztartetelService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
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

  async onKeresesTovabb() {
    this.spinner = true;
    try {
      const res = await this.penztartetelservice.Select(this.ptp);
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
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }


  doUjtetel() {
    this.tabla.ujtetelstart();
  }

  onUjtetelkesz(dto: PenztartetelDto) {
    if (dto !== undefined) {
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
import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {Szempont} from '../../../common/enums/szempont';
import {SzMT} from '../../../common/dtos/szmt';
import {BizonylatTipus} from '../bizonylattipus';
import {LogonService} from '../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {JogKod} from '../../../common/enums/jogkod';
import {ErrorService} from '../../../common/errorbox/error.service';
import {BizonylatDto} from '../bizonylatdto';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {BizonylatParameter} from '../bizonylatparameter';
import {BizonylatTipusLeiro} from '../bizonylattipusleiro';
import {BizonylattablaComponent} from '../bizonylattabla/bizonylattabla.component';
import {propCopy} from '../../../common/propCopy';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {BizonylatSzerkesztesComponent} from '../bizonylat-szerkesztes/bizonylat-szerkesztes.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylat-list',
  templateUrl: './bizonylat-list.component.html'
})
export class BizonylatListComponent extends OnDestroyMixin implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: BizonylattablaComponent;
  @ViewChild('compcont_bizonylatuj', {read: ViewContainerRef}) vcruj: ViewContainerRef;

  megrendelesszurok = ['Mind', 'Nincs kiszállítva'];
  szurok = ['Id', 'Bizonylatszám', 'Ügyfél'];
  szempontok = [
    Szempont.Kod, Szempont.Bizonylatszam, Szempont.Ugyfel,
  ];
  megrendelesszempont = 1;
  szempont = 0;
  minta = '';
  bp = new BizonylatParameter(0, environment.lapmeret);
  OsszesRekord = 0;
  elsokereses = true;

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  bizonylatTipus = BizonylatTipus.Szamla;
  bizonylatLeiro = new BizonylatTipusLeiro();
  mod = false;

  Dto = new Array<BizonylatDto>();
  DtoSelectedIndex = -1;

  private _sub: any;

  bizonylatservice: BizonylatService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _route: ActivatedRoute,
              private _cdr: ChangeDetectorRef,
              bizonylatservice: BizonylatService) {
    super();

    this.mod = this._logonservice.Jogaim.includes(JogKod[JogKod.BIZONYLATMOD]);
    this.bizonylatservice = bizonylatservice;
  }

  async ngOnInit() {
    this._sub = this._route.url.subscribe(async pars => {
      switch (pars[0].path) {
        case 'dijbekero':
          this.bizonylatTipus = BizonylatTipus.DijBekero;
          break;
        case 'elolegszamla':
          this.bizonylatTipus = BizonylatTipus.ElolegSzamla;
          break;
        case 'szallito':
          this.bizonylatTipus = BizonylatTipus.Szallito;
          break;
        case 'szamla':
          this.bizonylatTipus = BizonylatTipus.Szamla;
          break;
        case 'megrendeles':
          this.bizonylatTipus = BizonylatTipus.Megrendeles;
          break;
        case 'bejovoszamla':
          this.bizonylatTipus = BizonylatTipus.BejovoSzamla;
          break;
      }

      this.spinner = true;
      try {
        const res = await this.bizonylatservice.BizonylatLeiro(this.bizonylatTipus);
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatLeiro = res.Result;
        this.spinner = false;
      } catch (err) {
        this.spinner = false;
        this._errorservice.Error = err;
      }
    });
  }

  docdr() {
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  onKereses() {
    this.vcruj.clear();
    this.tabla.clearselections();

    this.elsokereses = true;

    this.bp.rekordtol = 0;
    this.bp.fi = new Array();
    this.bp.BizonylatTipus = this.bizonylatTipus;
    this.bp.fi.push(new SzMT(this.szempontok[this.szempont], this.minta));

    // valamiért number-ként és '===' operátorral nem működik
    if (this.bizonylatTipus === BizonylatTipus.Megrendeles && (this.megrendelesszempont.toString() === '1')) {
      this.bp.fi.push(new SzMT(Szempont.NincsKiszallitva, ''));
    }

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  async onKeresesTovabb() {
    this.spinner = true;
    try {
      const res = await this.bizonylatservice.Select(this.bp);
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

      this.bp.rekordtol += this.bp.lapmeret;
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  doUjtetel() {
    this.vcruj.clear();
    this.tabla.clearselections();

    const ujC = this.vcruj.createComponent(BizonylatSzerkesztesComponent);
    ujC.instance.uj = true;
    ujC.instance.bizonylatTipus = this.bizonylatTipus;
    ujC.instance.bizonylatLeiro = this.bizonylatLeiro;
    ujC.instance.eventOk.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.vcruj.clear();

      const buf = [...this.Dto];
      buf.unshift(dto);
      this.Dto = buf;

      this.docdr();
    });
    ujC.instance.eventMegsem.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcruj.clear();
    });
  }

  onId(i: number) {
    this.vcruj.clear();
    this.DtoSelectedIndex = i;
    this.tabla.egytetelstart();
  }

  onTorlesutan() {
    this.Dto.splice(this.DtoSelectedIndex, 1);
    this.DtoSelectedIndex = -1;
    this.tabla.clearselections();
  }

  onSzerkesztesutan(dto: BizonylatDto) {
    propCopy(dto, this.Dto[this.DtoSelectedIndex]);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    this._sub.unsubscribe();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}


import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BizonylatService} from '../../03 Bizonylatok/bizonylat/bizonylat.service';
import {Szempont} from '../../common/enums/szempont';
import {SzMT} from '../../common/dtos/szmt';
import {BizonylatTipus} from '../../03 Bizonylatok/bizonylat/bizonylattipus';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {JogKod} from '../../common/enums/jogkod';
import {ErrorService} from '../../common/errorbox/error.service';
import {BizonylatDto} from '../../03 Bizonylatok/bizonylat/bizonylatdto';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import {BizonylatParameter} from '../../03 Bizonylatok/bizonylat/bizonylatparameter';
import {BizonylatTipusLeiro} from '../../03 Bizonylatok/bizonylat/bizonylattipusleiro';
import {BizonylattablaComponent} from '../bizonylattabla/bizonylattabla.component';
import {propCopy} from '../../common/propCopy';

@Component({
  selector: 'app-bizonylat-list',
  templateUrl: './bizonylat-list.component.html'
})
export class BizonylatListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: BizonylattablaComponent;

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

  bizonylatTipus = BizonylatTipus.Szamla;
  bizonylatLeiro = new BizonylatTipusLeiro();
  mod = false;

  Dto = new Array<BizonylatDto>();
  DtoSelectedIndex = -1;

  private _sub: any;

  egybizonylat_egymode = 2; // részletek

  bizonylatservice: BizonylatService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _route: ActivatedRoute,
              bizonylatservice: BizonylatService) {
    this.mod = this._logonservice.Jogaim.includes(JogKod[JogKod.BIZONYLATMOD]);

    this.bizonylatservice = bizonylatservice;
  }

  ngOnInit() {
    this._sub = this._route.url.subscribe(pars => {
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

      this.eppFrissit = true;
      this.bizonylatservice.BizonylatLeiro(this.bizonylatTipus)
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.bizonylatLeiro = res.Result;
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    });
  }

  onKereses() {
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

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.bizonylatservice.Select(this.bp)
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

        this.bp.rekordtol += this.bp.lapmeret;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onId(i: number) {
    if (i !== this.DtoSelectedIndex) {
      this.egybizonylat_egymode = 2;
    } else {
      this.egybizonylat_egymode = 0;
    }

    this.DtoSelectedIndex = i;
  }

  doUjtetel() {
    this.tabla.ujtetelstart();
  }
  onUjtetelkesz(dto: BizonylatDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }
  onSzerkesztesutan(dto: BizonylatDto) {
    propCopy(dto, this.Dto[this.DtoSelectedIndex]);
  }
  onTorlesutan() {
    this.Dto.splice(this.DtoSelectedIndex, 1);
    this.DtoSelectedIndex = -1;

    this.tabla.clearselections();
  }

  ngOnDestroy() {
    this._sub.unsubscribe();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

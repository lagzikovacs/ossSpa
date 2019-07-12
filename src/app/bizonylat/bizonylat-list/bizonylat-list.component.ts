import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {Szempont} from '../../enums/szempont';
import {SzMT} from '../../dtos/szmt';
import {BizonylatTipus} from '../bizonylattipus';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {BizonylatDto} from '../bizonylatdto';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import {BizonylatParameter} from '../bizonylatparameter';
import {BizonylatTipusLeiro} from '../bizonylattipusleiro';
import {BizonylattablaComponent} from '../bizonylattabla/bizonylattabla.component';
import {propCopy} from '../../tools/propCopy';

@Component({
  selector: 'app-bizonylat-list',
  templateUrl: './bizonylat-list.component.html'
})
export class BizonylatListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla') tabla: BizonylattablaComponent;

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

  bizonylatTipus = BizonylatTipus.Szamla;
  bizonylatLeiro = new BizonylatTipusLeiro();
  mod = false;

  Dto = new Array<BizonylatDto>();
  DtoSelectedIndex = -1;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  private _sub: any;
  bizonylatservice: BizonylatService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
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

    if (this.bizonylatTipus === BizonylatTipus.Megrendeles && this.megrendelesszempont === 1) {
      this.bp.fi.push(new SzMT(Szempont.NincsKiszallitva, ''));
    }

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
    this.DtoSelectedIndex = i;

    // this.eppFrissit = true;
    // this.bizonylatservice.GetComplex(this.Dto[this.DtoSelectedIndex].Bizonylatkod)
    //   .then(res => {
    //     if (res.Error != null) {
    //       throw res.Error;
    //     }
    //
    //     this.Dto[this.DtoSelectedIndex] = res.Result[0].Dto;
    //
    //     this.bizonylatservice.TetelDto = res.Result[0].LstTetelDto;
    //     this.bizonylatservice.AfaDto = res.Result[0].LstAfaDto;
    //     this.bizonylatservice.TermekdijDto = res.Result[0].LstTermekdijDto;
    //
    //     this.bizonylatservice.EgyMode = BizonylatEgyMode.Reszletek;
    //     this.eppFrissit = false;
    //   })
    //   .catch(err => {
    //     this.eppFrissit = false;
    //     this._errorservice.Error = err;
    //   });
  }

  doUjtetel() {
    this.tabla.ujtetelstart();

    // this.eppFrissit = true;
    // this.bizonylatservice.CreateNewComplex()
    //   .then(res => {
    //     if (res.Error !== null) {
    //       throw res.Error;
    //     }
    //
    //     this.bizonylatservice.ComplexDtoEdited = res.Result[0];
    //     this.bizonylatservice.ComplexDtoEdited.Dto.Bizonylattipuskod = this.bizonylatservice.bizonylatTipus;
    //
    //     this.bizonylatservice.uj = true;
    //     this.eppFrissit = false;
    //     this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.List;
    //   })
    //   .catch(err => {
    //     this.eppFrissit = false;
    //     this._errorservice.Error = err;
    //   });
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

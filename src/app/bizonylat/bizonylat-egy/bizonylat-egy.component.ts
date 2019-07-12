import {Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {BizonylatEgyMode} from '../bizonylategymode';
import {BizonylatTipus} from '../bizonylattipus';
import {BizonylatSzerkesztesMode} from '../bizonylatszerkesztesmode';
import {VagolapService} from '../../vagolap/vagolap.service';
import {AbuComponent} from '../../tools/abu/abu.component';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {rowanimation} from '../../animation/rowAnimation';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {BizonylatDto} from '../bizonylatdto';
import {propCopy} from '../../tools/propCopy';
import {deepCopy} from '../../tools/deepCopy';
import {BizonylatTipusLeiro} from '../bizonylattipusleiro';

@Component({
  selector: 'app-bizonylat-egy',
  templateUrl: './bizonylat-egy.component.html',
  animations: [rowanimation]
})
export class BizonylatEgyComponent implements OnDestroy {
  @ViewChild(AbuComponent) abu: AbuComponent;

  Dto = new BizonylatDto();
  @Input() set DtoOriginal(value: BizonylatDto) {
    this.Dto = deepCopy(value);
  }
  @Input() bizonylatLeiro = new BizonylatTipusLeiro();
  @Input() enTorles = true;
  @Output() eventSzerkesztesutan = new EventEmitter<BizonylatDto>();
  @Output() eventTorlesutan = new EventEmitter<void>();

  EgyMode = BizonylatEgyMode.Reszletek;

  mod = false;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  bizonylatservice: BizonylatService;

  constructor(private _logonservice: LogonService,
              private _vagolapservice: VagolapService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              bizonylatservice: BizonylatService) {
    this.mod = this._logonservice.Jogaim.includes(JogKod[JogKod.BIZONYLATMOD]);
    this.bizonylatservice = bizonylatservice;
  }

  modositasenabled(): boolean {
    return this.Dto.Bizonylatszam === null;
  }
  torlesenabled(): boolean {
    return this.Dto.Bizonylatszam === null;
  }
  kibocsatasenabled(): boolean {
    return this.Dto.Bizonylatszam === null;
  }
  kiszallitvaenabled(): boolean {
    return this.bizonylatLeiro.bizonylatTipus === BizonylatTipus.Megrendeles;
  }
  kifizetesrendbenenabled(): boolean {
    return (this.bizonylatLeiro.bizonylatTipus === BizonylatTipus.Szamla ||
      this.bizonylatLeiro.bizonylatTipus === BizonylatTipus.BejovoSzamla ||
      this.bizonylatLeiro.bizonylatTipus === BizonylatTipus.DijBekero ||
      this.bizonylatLeiro.bizonylatTipus === BizonylatTipus.ElolegSzamla) &&
      this.Dto.Bizonylatszam !== null;
  }
  penztarenabled(): boolean {
    console.log((this.bizonylatLeiro.bizonylatTipus === BizonylatTipus.Szamla));
    console.log(this.bizonylatLeiro);

    return (this.bizonylatLeiro.bizonylatTipus === BizonylatTipus.Szamla ||
      this.bizonylatLeiro.bizonylatTipus === BizonylatTipus.BejovoSzamla ||
      this.bizonylatLeiro.bizonylatTipus === BizonylatTipus.ElolegSzamla) &&
      this.Dto.Bizonylatszam !== null &&
      this.Dto.Fizetesimod === 'Készpénz';
  }
  stornoenabled(): boolean {
    return this.Dto.Bizonylatszam !== null &&
      this.bizonylatLeiro.Stornozhato &&
      !this.Dto.Ezstornozott &&
      !this.Dto.Ezstornozo;
  }
  formaiellenorzesenabled(): boolean {
    return (this.bizonylatLeiro.bizonylatTipus === BizonylatTipus.Szamla ||
    this.bizonylatLeiro.bizonylatTipus === BizonylatTipus.BejovoSzamla);
  }
  osnxmlenabled(): boolean {
    return (this.bizonylatLeiro.bizonylatTipus === BizonylatTipus.Szamla ||
      this.bizonylatLeiro.bizonylatTipus === BizonylatTipus.BejovoSzamla);
  }

  reszletek() {
    this.EgyMode = BizonylatEgyMode.Reszletek;
  }
  torles() {
    this.EgyMode = BizonylatEgyMode.Torles;
  }
  modositas() {
    // itt másolat szokott készülni az aktuális rekordról
    // most a complex miatt egyszerűbb újra lekérni

    this.eppFrissit = true;
    this.bizonylatservice.GetComplex(this.Dto.Bizonylatkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatservice.ComplexDtoEdited = res.Result[0];

        this.bizonylatservice.uj = false;
        this.eppFrissit = false;
        this.EgyMode = BizonylatEgyMode.Modositas;
        this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.List;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  nyomtatas() {
    this.EgyMode = BizonylatEgyMode.Nyomtatas;
  }
  errol() {
    this.EgyMode = BizonylatEgyMode.Errol;
  }
  kibocsatas() {
    this.EgyMode = BizonylatEgyMode.Kibocsatas;
  }
  penztar() {
    this.EgyMode = BizonylatEgyMode.Penztar;
  }
  storno() {
    this.EgyMode = BizonylatEgyMode.Storno;
  }
  kifizetesrendben() {
    this.EgyMode = BizonylatEgyMode.Kifizetesrendben;
  }
  kiszallitva() {
    this.EgyMode = BizonylatEgyMode.Kiszallitva;
  }
  kifizetes() {
    this.EgyMode = BizonylatEgyMode.Kifizetes;
  }
  irat() {
    this.EgyMode = BizonylatEgyMode.Irat;
  }
  formaiellenorzes() {
    this.EgyMode = BizonylatEgyMode.Formaiellenorzes;
  }
  osnxml() {
    this.EgyMode = BizonylatEgyMode.OSNxml;
  }
  vagolap() {
    this._vagolapservice.bizonylatotvagolapra(this.Dto, this.bizonylatLeiro.BizonylatNev);
    this.abu.Uzenet('A(z) ' + this.bizonylatLeiro.BizonylatNev + ' a vágólapra került!');
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.bizonylatservice.Delete(this.Dto)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.eppFrissit = false;
        this.eventTorlesutan.emit();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  TorlesCancel() {
    this.EgyMode = BizonylatEgyMode.Reszletek;
  }


  onBizonylaterrolUtan(ok: boolean) {
    this.EgyMode = BizonylatEgyMode.Blank;
  }

  onKifizetesrendbenUtan(dto: BizonylatDto) {
    propCopy(dto, this.Dto);
  }

  onKiszallitvaUtan(dto: BizonylatDto) {
    propCopy(dto, this.Dto);
  }

  onStornozando(dto: BizonylatDto) {
    propCopy(dto, this.Dto);
  }

  onStornozo(dto: BizonylatDto) {
    // this.bizonylatservice.Dto.unshift(dto);
  }

  onStornoMegsem() {
    this.EgyMode = BizonylatEgyMode.Reszletek;
  }

  onKibocsatasUtan(dto: BizonylatDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto);
    } else {
      this.EgyMode = BizonylatEgyMode.Reszletek;
    }
  }

  onKibocsatasUtanKeszpenzes(keszpenzes: boolean) {
    if (keszpenzes) {
      this.EgyMode = BizonylatEgyMode.Penztar;
    } else {
      this.EgyMode = BizonylatEgyMode.Reszletek;
    }
  }

  onPenztarUtan() {
    this.EgyMode = BizonylatEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}



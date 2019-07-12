import {Component, EventEmitter, OnDestroy, Output, ViewChild} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {BizonylatContainerMode} from '../bizonylatcontainermode';
import {BizonylatEgyMode} from '../bizonylategymode';
import {BizonylatTipus} from '../bizonylattipus';
import {PenztarService} from '../../penztar/penztar.service';
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

@Component({
  selector: 'app-bizonylat-egy',
  templateUrl: './bizonylat-egy.component.html',
  animations: [rowanimation]
})
export class BizonylatEgyComponent implements OnDestroy {
  @ViewChild(AbuComponent) abu: AbuComponent;

  bizonylatservice: BizonylatService;
  mod = false;

  @Output() torlesutan = new EventEmitter<void>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _logonservice: LogonService,
              private _penztarsevice: PenztarService,
              private _vagolapservice: VagolapService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              bizonylatservice: BizonylatService) {
    this.mod = this._logonservice.Jogaim.includes(JogKod[JogKod.BIZONYLATMOD]);
    this.bizonylatservice = bizonylatservice;
  }

  modositasenabled(): boolean {
    return this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Bizonylatszam === null;
  }
  torlesenabled(): boolean {
    return this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Bizonylatszam === null;
  }
  kibocsatasenabled(): boolean {
    return this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Bizonylatszam === null;
  }
  kiszallitvaenabled(): boolean {
    return this.bizonylatservice.bizonylatTipus === BizonylatTipus.Megrendeles;
  }
  kifizetesrendbenenabled(): boolean {
    return (this.bizonylatservice.bizonylatTipus === BizonylatTipus.Szamla ||
      this.bizonylatservice.bizonylatTipus === BizonylatTipus.BejovoSzamla ||
      this.bizonylatservice.bizonylatTipus === BizonylatTipus.DijBekero ||
      this.bizonylatservice.bizonylatTipus === BizonylatTipus.ElolegSzamla) &&
      this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Bizonylatszam !== null;
  }
  penztarenabled(): boolean {
    return (this.bizonylatservice.bizonylatTipus === BizonylatTipus.Szamla ||
      this.bizonylatservice.bizonylatTipus === BizonylatTipus.BejovoSzamla) &&
      this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Bizonylatszam !== null &&
      this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Fizetesimod === 'Készpénz';
  }
  stornoenabled(): boolean {
    return this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Bizonylatszam !== null &&
      this.bizonylatservice.bizonylatLeiro.Stornozhato &&
      !this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Ezstornozott &&
      !this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Ezstornozo;
  }
  formaiellenorzesenabled(): boolean {
    return (this.bizonylatservice.bizonylatTipus === BizonylatTipus.Szamla ||
    this.bizonylatservice.bizonylatTipus === BizonylatTipus.BejovoSzamla);
  }
  osnxmlenabled(): boolean {
    return (this.bizonylatservice.bizonylatTipus === BizonylatTipus.Szamla ||
      this.bizonylatservice.bizonylatTipus === BizonylatTipus.BejovoSzamla);
  }

  vissza() {
    this.bizonylatservice.ContainerMode = BizonylatContainerMode.List;
  }
  reszletek() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Reszletek;
  }
  torles() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Torles;
  }
  modositas() {
    // itt másolat szokott készülni az aktuális rekordról
    // most a complex miatt egyszerűbb újra lekérni

    this.eppFrissit = true;
    this.bizonylatservice.GetComplex(this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Bizonylatkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatservice.ComplexDtoEdited = res.Result[0];

        this.bizonylatservice.uj = false;
        this.eppFrissit = false;
        this.bizonylatservice.EgyMode = BizonylatEgyMode.Modositas;
        this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.List;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  nyomtatas() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Nyomtatas;
  }
  errol() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Errol;
  }
  kibocsatas() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Kibocsatas;
  }
  penztar() {
    this.eppFrissit = true;
    this._penztarsevice.ReadByCurrencyOpened(this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Penznemkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatservice.BizonylatPenztarDto = res.Result;

        this.bizonylatservice.EgyMode = BizonylatEgyMode.Penztar;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  storno() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Storno;
  }
  kifizetesrendben() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Kifizetesrendben;
  }
  kiszallitva() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Kiszallitva;
  }
  kifizetes() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Kifizetes;
  }
  irat() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Irat;
  }
  formaiellenorzes() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Formaiellenorzes;
  }
  osnxml() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.OSNxml;
  }
  vagolap() {
    this._vagolapservice.bizonylatotvagolapra(this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex],
      this.bizonylatservice.bizonylatLeiro.BizonylatNev);
    this.abu.Uzenet('A(z) ' + this.bizonylatservice.bizonylatLeiro.BizonylatNev + ' a vágólapra került!');
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.bizonylatservice.Delete(this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatservice.Dto.splice(this.bizonylatservice.DtoSelectedIndex, 1);
        this.bizonylatservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.torlesutan.emit();
        this.bizonylatservice.ContainerMode = BizonylatContainerMode.List;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  TorlesCancel() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Reszletek;
  }


  onBizonylaterrolUtan(ok: boolean) {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Blank;
  }

  onKifizetesrendbenUtan(dto: BizonylatDto) {
    propCopy(dto, this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex]);
  }

  onKiszallitvaUtan(dto: BizonylatDto) {
    propCopy(dto, this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex]);
  }

  onStornozando(dto: BizonylatDto) {
    propCopy(dto, this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex]);
  }

  onStornozo(dto: BizonylatDto) {
    this.bizonylatservice.Dto.unshift(dto);
    this.bizonylatservice.ContainerMode = BizonylatContainerMode.List;
  }

  onStornoMegsem() {
    this.bizonylatservice.EgyMode = BizonylatEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

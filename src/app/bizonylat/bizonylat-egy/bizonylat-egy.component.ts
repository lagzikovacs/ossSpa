import {Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {BizonylatEgyMode} from '../bizonylategymode';
import {BizonylatTipus} from '../bizonylattipus';
import {VagolapService} from '../../vagolap/vagolap.service';
import {AbuComponent} from '../../tools/abu/abu.component';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {rowanimation} from '../../animation/rowAnimation';
import {ErrorService} from '../../tools/errorbox/error.service';
import {BizonylatDto} from '../bizonylatdto';
import {propCopy} from '../../tools/propCopy';
import {deepCopy} from '../../tools/deepCopy';
import {BizonylatTipusLeiro} from '../bizonylattipusleiro';
import {ProjektkapcsolatService} from '../../projektkapcsolat/projektkapcsolat.service';
import {ProjektService} from '../../projekt/projekt.service';
import {ProjektResult} from '../../projekt/projektresult';
import {ProjektDto} from '../../projekt/projektdto';

@Component({
  selector: 'app-bizonylat-egy',
  templateUrl: './bizonylat-egy.component.html',
  animations: [rowanimation]
})
export class BizonylatEgyComponent implements OnDestroy {
  @ViewChild(AbuComponent, {static: true}) abu: AbuComponent;

  Dto = new BizonylatDto();
  @Input() set DtoOriginal(value: BizonylatDto) {
    this.Dto = deepCopy(value);
  }
  @Input() bizonylatTipus = BizonylatTipus.Szamla;
  @Input() bizonylatLeiro = new BizonylatTipusLeiro();
  @Input() enTorles = true;
  @Input() enProjekt = true;
  @Output() eventSzerkesztesutan = new EventEmitter<BizonylatDto>();
  @Output() eventTorlesutan = new EventEmitter<void>();

  private _bbmode = 1;
  @Output() bbmodeChange = new EventEmitter<number>();
  @Input() get bbmode() { return this._bbmode; }
  set bbmode(value: number) {
    this._bbmode = value;
    this.bbmodeChange.emit(this._bbmode);
  }

  private _egymode = 0;
  @Output() egymodeChange = new EventEmitter<number>();
  @Input() get egymode() { return this._egymode; }
  set egymode(value: number) {
    this._egymode = value;
    this.egymodeChange.emit(this._egymode);
  }

  BizonylatProjektje: ProjektDto;
  nincsProjekt = false;
  mod = false;
  eppFrissit = false;

  bizonylatservice: BizonylatService;
  projektservice: ProjektService;

  constructor(private _logonservice: LogonService,
              private _vagolapservice: VagolapService,
              private _errorservice: ErrorService,
              private _projektkapcsolatservice: ProjektkapcsolatService,
              bizonylatservice: BizonylatService,
              projektservice: ProjektService) {
    this.mod = this._logonservice.Jogaim.includes(JogKod[JogKod.BIZONYLATMOD]);

    this.bizonylatservice = bizonylatservice;
    this.projektservice = projektservice;
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
    return this.bizonylatTipus === BizonylatTipus.Megrendeles;
  }
  fuvarszamlaenabled(): boolean {
    return this.bizonylatTipus === BizonylatTipus.BejovoSzamla &&
      this.Dto.Bizonylatszam !== null;
  }
  kifizetesrendbenenabled(): boolean {
    return (this.bizonylatTipus === BizonylatTipus.Szamla ||
      this.bizonylatTipus === BizonylatTipus.BejovoSzamla ||
      this.bizonylatTipus === BizonylatTipus.DijBekero ||
      this.bizonylatTipus === BizonylatTipus.ElolegSzamla) &&
      this.Dto.Bizonylatszam !== null;
  }
  penztarenabled(): boolean {
    return (this.bizonylatTipus === BizonylatTipus.Szamla ||
      this.bizonylatTipus === BizonylatTipus.BejovoSzamla ||
      this.bizonylatTipus === BizonylatTipus.ElolegSzamla) &&
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
    return (this.bizonylatTipus === BizonylatTipus.Szamla ||
    this.bizonylatTipus === BizonylatTipus.BejovoSzamla);
  }
  osnxmlenabled(): boolean {
    return (this.bizonylatTipus === BizonylatTipus.Szamla ||
      this.bizonylatTipus === BizonylatTipus.BejovoSzamla);
  }

  doNav(i: number) {
    this.bbmode = 0;
    this.egymode = i;
  }





  doProjekt() {
    this.eppFrissit = true;
    this._projektkapcsolatservice.SelectByBizonylat(this.Dto.Bizonylatkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (res.Result.length === 0) {
          this.nincsProjekt = true;
          return new Promise<ProjektResult>((resolve, reject) => { resolve(new ProjektResult()); });
        } else {
          this.nincsProjekt = false;
          return this.projektservice.Get(res.Result[0].Projektkod);
        }
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (!this.nincsProjekt) {
          this.BizonylatProjektje = res1.Result[0];
        }

        this.EgyMode = BizonylatEgyMode.Projekt;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  vagolap() {
    this._vagolapservice.bizonylatotvagolapra(this.Dto, this.bizonylatLeiro.BizonylatNev);
    this.abu.Uzenet('A(z) ' + this.bizonylatLeiro.BizonylatNev + ' a vágólapra került!');
  }

  onTorles(ok: boolean) {
    if (ok) {
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
    } else {
      this.EgyMode = BizonylatEgyMode.Reszletek;
    }
  }

  onBizonylaterrolUtan(ok: boolean) {
    this.EgyMode = BizonylatEgyMode.Blank;
  }

  onKifizetesrendbenUtan(dto: BizonylatDto) {
    propCopy(dto, this.Dto);
    this.eventSzerkesztesutan.emit(dto);
  }

  onKiszallitvaUtan(dto: BizonylatDto) {
    propCopy(dto, this.Dto);
    this.eventSzerkesztesutan.emit(dto);
  }

  onStornozando(dto: BizonylatDto) {
    propCopy(dto, this.Dto);
    this.eventSzerkesztesutan.emit(dto);
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
      this.eventSzerkesztesutan.emit(dto);
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

  onSzerkesztesUtan(dto: BizonylatDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto);
      this.eventSzerkesztesutan.emit(dto);
    }

    this.EgyMode = BizonylatEgyMode.Reszletek;
  }

  onFuvarszamlaUtan(dto: BizonylatDto) {
    propCopy(dto, this.Dto);
    this.eventSzerkesztesutan.emit(dto);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}



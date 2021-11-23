import {Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {BizonylatEgyMode} from '../bizonylategymode';
import {BizonylatTipus} from '../bizonylattipus';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {rowanimation} from '../../animation/rowAnimation';
import {ErrorService} from '../../tools/errorbox/error.service';
import {BizonylatDto} from '../bizonylatdto';
import {propCopy} from '../../tools/propCopy';
import {deepCopy} from '../../tools/deepCopy';
import {BizonylatTipusLeiro} from '../bizonylattipusleiro';
import {ProjektService} from '../../projekt/projekt.service';

@Component({
  selector: 'app-bizonylat-egy',
  templateUrl: './bizonylat-egy.component.html',
  animations: [rowanimation]
})
export class BizonylatEgyComponent implements OnDestroy {
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

  mod = false;
  eppFrissit = false;

  bizonylatservice: BizonylatService;
  projektservice: ProjektService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
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
      this.bbmode = 1;
      this.egymode = 0;
    }
  }

  onBizonylaterrolUtan(ok: boolean) {
    this.bbmode = 1;
    this.egymode = 0;
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
    this.bbmode = 1;
    this.egymode = 0;
  }

  onKibocsatasUtan(dto: BizonylatDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto);
      this.eventSzerkesztesutan.emit(dto);
    } else {
      this.bbmode = 1;
      this.egymode = 0;
    }
  }

  onKibocsatasUtanKeszpenzes(keszpenzes: boolean) {
    if (keszpenzes) {
      this.bbmode = 1;
      this.egymode = BizonylatEgyMode.Penztar;
    } else {
      this.bbmode = 1;
      this.egymode = 0;
    }
  }

  onPenztarUtan() {
    this.bbmode = 1;
    this.egymode = 0;
  }

  onSzerkesztesUtan(dto: BizonylatDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto);
      this.eventSzerkesztesutan.emit(dto);
    }

    this.bbmode = 1;
    this.egymode = 0;
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



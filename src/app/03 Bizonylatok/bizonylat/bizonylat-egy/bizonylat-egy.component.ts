import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {BizonylatEgyMode} from '../bizonylategymode';
import {BizonylatTipus} from '../bizonylattipus';
import {LogonService} from '../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {JogKod} from '../../../common/enums/jogkod';
import {ErrorService} from '../../../common/errorbox/error.service';
import {BizonylatDto} from '../bizonylatdto';
import {propCopy} from '../../../common/propCopy';
import {deepCopy} from '../../../common/deepCopy';
import {BizonylatTipusLeiro} from '../bizonylattipusleiro';
import {ProjektService} from '../../../02 Eszkozok/01 Projekt/projekt/projekt.service';
import {ProjektKapcsolatDto} from '../../../02 Eszkozok/01 Projekt/projektkapcsolat/projektkapcsolatdto';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {BizonylatErrolComponent} from '../bizonylat-errol/bizonylat-errol.component';
import {BizonylatKibocsatasComponent} from '../bizonylat-kibocsatas/bizonylat-kibocsatas.component';
import {BizonylatKifizetesrendbenComponent} from '../bizonylat-kifizetesrendben/bizonylat-kifizetesrendben.component';
import {BizonylatKiszallitvaComponent} from '../bizonylat-kiszallitva/bizonylat-kiszallitva.component';
import {BizonylatStornoComponent} from '../bizonylat-storno/bizonylat-storno.component';
import {BizonylatNyomtatasComponent} from '../../bizonylatnyomtatas/bizonylat-nyomtatas/bizonylat-nyomtatas.component';
import {KifizetesListComponent} from '../../kifizetes/kifizetes-list/kifizetes-list.component';
import {VagolapBizonylathozComponent} from '../../../05 Segedeszkozok/08 Vagolap/vagolap-bizonylathoz/vagolap-bizonylathoz.component';
import {BizonylatProjektjeComponent} from '../bizonylat-projektje/bizonylat-projektje.component';
import {BizonylatPenztarComponent} from '../bizonylat-penztar/bizonylat-penztar.component';
import {BizonylatReszletekComponent} from '../bizonylat-reszletek/bizonylat-reszletek.component';
import {TetelTorlesComponent} from '../../../common/tetel-torles/tetel-torles.component';
import {BizonylatkapcsolatListComponent} from '../../bizonylatkapcsolat/bizonylatkapcsolat-list/bizonylatkapcsolat-list.component';
import {BizonylatFuvarszamlaComponent} from '../../../bizonylat/bizonylat-fuvarszamla/bizonylat-fuvarszamla.component';
import {BizonylatSzerkesztesComponent} from '../../../bizonylat/bizonylat-szerkesztes/bizonylat-szerkesztes.component';
import {ProjektkapcsolatLevalasztasComponent} from '../../../02 Eszkozok/01 Projekt/projektkapcsolat/projektkapcsolat-levalasztas/projektkapcsolat-levalasztas.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylat-egy',
  templateUrl: './bizonylat-egy.component.html'
})
export class BizonylatEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_bizonylat', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() uj = false;
  @Input() bizonylatTipus = BizonylatTipus.Szamla;
  @Input() bizonylatLeiro = new BizonylatTipusLeiro();
  @Input() enTorles = true;
  @Input() enProjekt = true;
  @Input() enLevalasztas = false;
  @Input() defaultNav = 2;

  @Input() projektkapcsolatDto: ProjektKapcsolatDto = new ProjektKapcsolatDto();

  Dto = new BizonylatDto();
  @Input() set DtoOriginal(value: BizonylatDto) {
    this.Dto = deepCopy(value);
  }

  @Output() eventUj: EventEmitter<BizonylatDto> = new EventEmitter<BizonylatDto>();
  @Output() eventTorles = new EventEmitter<void>();
  @Output() eventModositas = new EventEmitter<BizonylatDto>();

  @Output() eventLevalasztas: EventEmitter<void> = new EventEmitter<void>();

  mod = false;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  bizonylatservice: BizonylatService;
  projektservice: ProjektService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              bizonylatservice: BizonylatService,
              projektservice: ProjektService) {
    super();

    this.mod = this._logonservice.Jogaim.includes(JogKod[JogKod.BIZONYLATMOD]);

    this.bizonylatservice = bizonylatservice;
    this.projektservice = projektservice;
  }

  ngAfterViewInit() {
    if (this.uj) {
      this.doNav(BizonylatEgyMode.Uj);
      this.docdr();
    }

    if (!this.uj && this.defaultNav > 0) {
      this.doNav(this.defaultNav);
      this.docdr();
    }
  }

  docdr() {
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  doNav(i: number) {
    this.vcr.clear();

    switch (i) {
      case BizonylatEgyMode.Uj: // -1
        const ujC = this.vcr.createComponent(BizonylatSzerkesztesComponent);
        ujC.instance.uj = true;
        ujC.instance.bizonylatTipus = this.bizonylatTipus;
        ujC.instance.bizonylatLeiro = this.bizonylatLeiro;
        ujC.instance.Bizonylatkod = this.Dto.Bizonylatkod;
        ujC.instance.eventSzerkesztesUtan.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.eventUj.emit(dto);
        });
      break;

      case BizonylatEgyMode.Nyomtatas: // 1
        const nyomtatasC = this.vcr.createComponent(BizonylatNyomtatasComponent);
        nyomtatasC.instance.Bizonylatkod = this.Dto.Bizonylatkod;
      break;

      case BizonylatEgyMode.Reszletek: // 2
        const reszletekC = this.vcr.createComponent(BizonylatReszletekComponent);
        reszletekC.instance.Bizonylatkod = this.Dto.Bizonylatkod;
        reszletekC.instance.bizonylatLeiro = this.bizonylatLeiro;
      break;

      case BizonylatEgyMode.Kifizetes: // 3
        const kifizetesC = this.vcr.createComponent(KifizetesListComponent);
        kifizetesC.instance.Bizonylat = this.Dto;
      break;

      case BizonylatEgyMode.Irat: // 4
        const bklC = this.vcr.createComponent(BizonylatkapcsolatListComponent);
        bklC.instance.Bizonylatkod = this.Dto.Bizonylatkod;
        bklC.instance.Ugyfelkod = this.Dto.Ugyfelkod;
      break;

      case BizonylatEgyMode.Torles: // 5
        const torlesC = this.vcr.createComponent(TetelTorlesComponent);
        torlesC.instance.cim = this.bizonylatLeiro.BizonylatNev;
        torlesC.instance.eventTorles.pipe(untilComponentDestroyed(this)).subscribe(async ok => {
          if (ok) {
            this.spinner = true;
            try {
              const res = await this.bizonylatservice.Delete(this.Dto);
              if (res.Error != null) {
                throw res.Error;
              }

              this.spinner = false;
              this.eventTorles.emit();
            } catch (err) {
              this.spinner = false;
              this._errorservice.Error = err;
            }
          } else {
            this.doNav(0);
          }
        });
      break;

      case BizonylatEgyMode.Modositas: // 6
        const szerkesztesC = this.vcr.createComponent(BizonylatSzerkesztesComponent);
        szerkesztesC.instance.uj = false;
        szerkesztesC.instance.bizonylatTipus = this.bizonylatTipus;
        szerkesztesC.instance.bizonylatLeiro = this.bizonylatLeiro;
        szerkesztesC.instance.Bizonylatkod = this.Dto.Bizonylatkod;
        szerkesztesC.instance.eventSzerkesztesUtan.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          if (dto !== null) {
            propCopy(dto, this.Dto);
            this.eventModositas.emit(dto);
          }

          this.doNav(0);
        });
      break;

      case BizonylatEgyMode.Errol: // 7
        const errolC = this.vcr.createComponent(BizonylatErrolComponent);
        errolC.instance.Bizonylatkod = this.Dto.Bizonylatkod;
        errolC.instance.eventBizonylaterrolUtan.pipe(untilComponentDestroyed(this)).subscribe(ok => {
          this.doNav(0);
        });

        this.docdr();
      break;
      case BizonylatEgyMode.Kibocsatas: // 8
        const kibocsatasC = this.vcr.createComponent(BizonylatKibocsatasComponent);
        kibocsatasC.instance.DtoOriginal = this.Dto;
        kibocsatasC.instance.bizonylatLeiro = this.bizonylatLeiro;
        kibocsatasC.instance.eventKibocsatasUtan.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          if (dto !== null) {
            propCopy(dto, this.Dto);
            this.eventModositas.emit(dto);
          } else {
            this.doNav(0);
          }
        });
        kibocsatasC.instance.eventKibocsatasUtanKeszpenzes.pipe(untilComponentDestroyed(this)).subscribe(keszpenzes => {
          if (keszpenzes) {
            this.doNav(BizonylatEgyMode.Penztar);
          } else {
            this.doNav(0);
          }
        });
      break;
      case BizonylatEgyMode.Storno: // 9
        const stornoC = this.vcr.createComponent(BizonylatStornoComponent);
        stornoC.instance.DtoOriginal = this.Dto;
        stornoC.instance.bizonylatLeiro = this.bizonylatLeiro;
        stornoC.instance.eventStornozando.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          propCopy(dto, this.Dto);
          this.eventModositas.emit(dto);
        });
        stornoC.instance.eventStornozo.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          // this.bizonylatservice.Dto.unshift(dto);
        });
        stornoC.instance.eventStornoMegsem.pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.doNav(0);
        });
      break;

      case BizonylatEgyMode.Penztar: // 10
        const penztarC = this.vcr.createComponent(BizonylatPenztarComponent);
        penztarC.instance.DtoOriginal = this.Dto;
        penztarC.instance.bizonylatTipus = this.bizonylatTipus;
        penztarC.instance.bizonylatLeiro = this.bizonylatLeiro;
        penztarC.instance.eventPenztarUtan.pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.doNav(0);
        });
      break;

      case BizonylatEgyMode.Kifizetesrendben: // 11
        const kifizetesrendbenC = this.vcr.createComponent(BizonylatKifizetesrendbenComponent);
        kifizetesrendbenC.instance.DtoOriginal = this.Dto;
        kifizetesrendbenC.instance.bizonylatLeiro = this.bizonylatLeiro;
        kifizetesrendbenC.instance.eventKifizetesrendbenUtan.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          propCopy(dto, this.Dto);
          this.eventModositas.emit(dto);
        });
      break;
      case BizonylatEgyMode.Kiszallitva: // 12
        const kiszallitvaC = this.vcr.createComponent(BizonylatKiszallitvaComponent);
        kiszallitvaC.instance.DtoOriginal = this.Dto;
        kiszallitvaC.instance.bizonylatLeiro = this.bizonylatLeiro;
        kiszallitvaC.instance.eventKiszallitvaUtan.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          propCopy(dto, this.Dto);
          this.eventModositas.emit(dto);
        });
      break;

      case BizonylatEgyMode.Projekt: // 15
        const projektC = this.vcr.createComponent(BizonylatProjektjeComponent);
        projektC.instance.item = this.Dto;
      break;

      case BizonylatEgyMode.Fuvarszamla: // 16
        const fuvarszamlaC = this.vcr.createComponent(BizonylatFuvarszamlaComponent);
        fuvarszamlaC.instance.dtoAnyagszamla = this.Dto;
        fuvarszamlaC.instance.eventOK.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          propCopy(dto, this.Dto);
          this.eventModositas.emit(dto);
        });
      break;

      case BizonylatEgyMode.Vagolap: // 17
        const vagolapC = this.vcr.createComponent(VagolapBizonylathozComponent);
        vagolapC.instance.item = this.Dto;
        vagolapC.instance.tipus = this.bizonylatLeiro.BizonylatNev;
      break;

      case BizonylatEgyMode.Levalasztas: // 18
        console.log(this.projektkapcsolatDto);

        const pklevalasztasC = this.vcr.createComponent(ProjektkapcsolatLevalasztasComponent);
        pklevalasztasC.instance.Dto = this.projektkapcsolatDto;
        pklevalasztasC.instance.eventLevalasztasutan.pipe(untilComponentDestroyed(this)).subscribe(ok => {
          this.doNav(0);
          if (ok) {
            this.eventLevalasztas.emit();
          }
        });
        this.docdr();
      break;
    }
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}



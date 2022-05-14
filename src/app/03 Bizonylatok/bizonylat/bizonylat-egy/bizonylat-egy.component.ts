import {
  AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {BizonylatEgyMode} from '../bizonylategymode';
import {BizonylatTipus} from '../bizonylattipus';
import {LogonService} from '../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {JogKod} from '../../../common/enums/jogkod';
import {rowanimation} from '../../../animation/rowAnimation';
import {ErrorService} from '../../../common/errorbox/error.service';
import {BizonylatDto} from '../bizonylatdto';
import {propCopy} from '../../../common/propCopy';
import {deepCopy} from '../../../common/deepCopy';
import {BizonylatTipusLeiro} from '../bizonylattipusleiro';
import {ProjektService} from '../../../02 Eszkozok/01 Projekt/projekt/projekt.service';
import {ProjektKapcsolatDto} from "../../../02 Eszkozok/01 Projekt/projektkapcsolat/projektkapcsolatdto";
import {OnDestroyMixin, untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {BizonylatErrolComponent} from "../bizonylat-errol/bizonylat-errol.component";
import {BizonylatKibocsatasComponent} from "../bizonylat-kibocsatas/bizonylat-kibocsatas.component";
import {BizonylatKifizetesrendbenComponent} from "../bizonylat-kifizetesrendben/bizonylat-kifizetesrendben.component";

@Component({
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

  @Output() eventSzerkesztesutan = new EventEmitter<BizonylatDto>();
  @Output() eventTorlesutan = new EventEmitter<void>();

  @Output() eventLevalasztasutan: EventEmitter<void> = new EventEmitter<void>();

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
            this.eventSzerkesztesutan.emit(dto);
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

      case BizonylatEgyMode.Kifizetesrendben: // 11
        const kifizetesrendbenC = this.vcr.createComponent(BizonylatKifizetesrendbenComponent);
        kifizetesrendbenC.instance.DtoOriginal = this.Dto;
        kifizetesrendbenC.instance.bizonylatLeiro = this.bizonylatLeiro;
        kifizetesrendbenC.instance.eventKifizetesrendbenUtan.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          propCopy(dto, this.Dto);
          this.eventSzerkesztesutan.emit(dto);
        });
      break;
      case BizonylatEgyMode.Kiszallitva: // 12
        // <ng-container *ngIf="egymode === 12">
        //   <div [@rowanimation]>
        // <app-bizonylat-kiszallitva [DtoOriginal]="Dto"
        //   [bizonylatLeiro]="bizonylatLeiro"
        // (eventKiszallitvaUtan)="onKiszallitvaUtan($event)">
        // </app-bizonylat-kiszallitva>
        // </div>
        // </ng-container>
      break;
    }

    onKiszallitvaUtan(dto: BizonylatDto) {
      propCopy(dto, this.Dto);
      this.eventSzerkesztesutan.emit(dto);
    }

    // Blank = 0,
    //   Nyomtatas = 1,
    //   Reszletek = 2,
    //   Kifizetes = 3,
    //   Irat = 4,
    //   Torles = 5,
    //   Modositas = 6,
    //   Errol = 7,
    //   Kibocsatas = 8,
    //   Storno = 9,
    //   Penztar = 10,
    //   Kifizetesrendben = 11,
    //   Kiszallitva = 12,
    //   Formaiellenorzes = 13,
    //   OSNxml = 14,
    //   Projekt = 15

    // <ng-container *ngIf="egymode === 1">
    //   <div [@rowanimation]>
    // <app-bizonylat-nyomtatas [Bizonylatkod]="Dto.Bizonylatkod">
    // </app-bizonylat-nyomtatas>
    // </div>
    // </ng-container>
    // <ng-container *ngIf="egymode === 2">
    //   <div [@rowanimation]>
    // <app-bizonylat-reszletek [Bizonylatkod]="Dto.Bizonylatkod"
    //   [bizonylatLeiro]="bizonylatLeiro">
    // </app-bizonylat-reszletek>
    // </div>
    // </ng-container>
    // <ng-container *ngIf="egymode === 3">
    //   <div [@rowanimation]>
    // <app-kifizetes-list [Bizonylat]="Dto">
    // </app-kifizetes-list>
    // </div>
    // </ng-container>
    // <ng-container *ngIf="egymode === 4">
    //   <div [@rowanimation]>
    // <app-bizonylatkapcsolat-list [Bizonylatkod]="Dto.Bizonylatkod"
    //   [Ugyfelkod]="Dto.Ugyfelkod">
    // </app-bizonylatkapcsolat-list>
    // </div>
    // </ng-container>
    // <ng-container *ngIf="egymode === 5">
    //   <div [@rowanimation]>
    // <app-tetel-torles [cim]="bizonylatLeiro.BizonylatNev"
    // (eventTorles)="onTorles($event)">
    // </app-tetel-torles>
    // </div>
    // </ng-container>
    // <ng-container *ngIf="egymode === 6">
    //   <div [@rowanimation]>
    // <app-bizonylat-szerkesztes [uj]="false"
    //   [bizonylatTipus]="bizonylatTipus"
    //   [bizonylatLeiro]="bizonylatLeiro"
    //   [Bizonylatkod]="Dto.Bizonylatkod"
    // (eventSzerkesztesUtan)="onSzerkesztesUtan($event)">
    // </app-bizonylat-szerkesztes>
    // </div>
    // </ng-container>
    //

    //
    // <ng-container *ngIf="egymode === 9">
    //   <div [@rowanimation]>
    // <app-bizonylat-storno [DtoOriginal]="Dto"
    //   [bizonylatLeiro]="bizonylatLeiro"
    // (eventStornozando)="onStornozando($event)"
    // (eventStornozo)="onStornozo($event)"
    // (eventStornoMegsem)="onStornoMegsem()">
    // </app-bizonylat-storno>
    // </div>
    // </ng-container>
    //
    // <ng-container *ngIf="egymode === 10">
    //   <div [@rowanimation]>
    // <app-bizonylat-penztar [DtoOriginal]="Dto"
    //   [bizonylatTipus]="bizonylatTipus"
    //   [bizonylatLeiro]="bizonylatLeiro"
    // (eventPenztarUtan)="onPenztarUtan()">
    // </app-bizonylat-penztar>
    // </div>
    // </ng-container>


    //
    // <ng-container *ngIf="egymode === 15">
    //   <div [@rowanimation]>
    // <app-bizonylat-projektje [item]="Dto"></app-bizonylat-projektje>
    // </div>
    // </ng-container>
    //
    // <ng-container *ngIf="egymode === 16">
    //   <div [@rowanimation]>
    // <app-bizonylat-fuvarszamla  [dtoAnyagszamla]="Dto"
    // (eventOK)="onFuvarszamlaUtan($event)">
    // </app-bizonylat-fuvarszamla>
    // </div>
    // </ng-container>
    //
    // <ng-container *ngIf="egymode === 17">
    //   <div [@rowanimation]>
    // <app-vagolap-bizonylathoz [item]="Dto" [tipus]="bizonylatLeiro.BizonylatNev">
    //   </app-vagolap-bizonylathoz>
    //   </div>
    //   </ng-container>
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
      this.doNav(0);
    }
  }






  onStornozando(dto: BizonylatDto) {
    propCopy(dto, this.Dto);
    this.eventSzerkesztesutan.emit(dto);
  }

  onStornozo(dto: BizonylatDto) {
    // this.bizonylatservice.Dto.unshift(dto);
  }

  onStornoMegsem() {
    this.doNav(0);
  }



  onPenztarUtan() {
    this.doNav(0);
  }

  onSzerkesztesUtan(dto: BizonylatDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto);
      this.eventSzerkesztesutan.emit(dto);
    }

    this.doNav(0);
  }

  onFuvarszamlaUtan(dto: BizonylatDto) {
    propCopy(dto, this.Dto);
    this.eventSzerkesztesutan.emit(dto);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}



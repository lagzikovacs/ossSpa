import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {IratService} from '../irat.service';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {EgyMode} from '../../../../common/enums/egymode';
import {IratDto} from '../iratdto';
import {propCopy} from '../../../../common/propCopy';
import {deepCopy} from '../../../../common/deepCopy';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {IratSzerkesztesComponent} from '../irat-szerkesztes/irat-szerkesztes.component';
import {TetelTorlesComponent} from '../../../../common/tetel-torles/tetel-torles.component';
import {ReszletekComponent} from '../../../../common/reszletek/reszletek.component';
import {DokumentumListComponent} from '../../dokumentum/dokumentum-list/dokumentum-list.component';
import {LogonService} from '../../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {JogKod} from '../../../../common/enums/jogkod';
import {IratProjektjeComponent} from "../irat-projektje/irat-projektje.component";
import {VagolapIrathozComponent} from "../../../../05 Segedeszkozok/08 Vagolap/vagolap-irathoz/vagolap-irathoz.component";
import {FotozasLinkComponent} from "../../fotozas-link/fotozas-link.component";
import {ProjektkapcsolatLevalasztasComponent} from "../../../01 Projekt/projektkapcsolat/projektkapcsolat-levalasztas/projektkapcsolat-levalasztas.component";
import {ProjektKapcsolatDto} from "../../../01 Projekt/projektkapcsolat/projektkapcsolatdto";
import {IratlevalasztasMode} from "../iratlevalasztasmode";
import {BizonylatKapcsolatDto} from "../../../../03 Bizonylatok/bizonylatkapcsolat/bizonylatkapcsolatdto";
import {BizonylatkapcsolatLevalasztasComponent} from "../../../../03 Bizonylatok/bizonylatkapcsolat/bizonylatkapcsolat-levalasztas/bizonylatkapcsolat-levalasztas.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-irat-egy',
  templateUrl: './irat-egy.component.html'
})
export class IratEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_irat', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() uj = false;
  @Input() enTorles = true;
  @Input() enProjekt = true;
  @Input() enUgyfel = true;
  @Input() enLevalasztas = false;
  @Input() LevalasztasMode = IratlevalasztasMode.Projektrol;
  @Input() defaultNav = 15;

  @Input() projektkapcsolatDto: ProjektKapcsolatDto = new ProjektKapcsolatDto();
  @Input() bizonylatkapcsolatDto: BizonylatKapcsolatDto = new BizonylatKapcsolatDto();

  Dto = new IratDto();
  @Input() set dto(value: IratDto) {
    this.Dto = deepCopy(value);
  }
  @Output() eventUj: EventEmitter<IratDto> = new EventEmitter<IratDto>();
  @Output() eventTorles: EventEmitter<void> = new EventEmitter<void>();
  @Output() eventModositas: EventEmitter<IratDto> = new EventEmitter<IratDto>();

  @Output() eventLevalasztasutan: EventEmitter<void> = new EventEmitter<void>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  jog = false;
  iratservice: IratService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              iratservice: IratService) {
    super();

    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.IRATMOD]);
    this.iratservice = iratservice;
  }

  ngAfterViewInit() {
    if (this.uj) {
      this.doNav(EgyMode.Uj);
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
      case EgyMode.Uj: // -1
        const ujC = this.vcr.createComponent(IratSzerkesztesComponent);

        ujC.instance.uj = true;
        ujC.instance.enUgyfel = this.enUgyfel;
        ujC.instance.eventOk.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doUjkesz(dto);
        });
        break;
      case EgyMode.Reszletek: // 1
        const reszletekC = this.vcr.createComponent(ReszletekComponent);

        reszletekC.instance.cim = this.iratservice.cim;
        reszletekC.instance.item = this.Dto;
        reszletekC.instance.colsets = this.iratservice.ReszletekSettings;
        break;
      case EgyMode.Torles: // 2
        const teteltorlesC = this.vcr.createComponent(TetelTorlesComponent);

        teteltorlesC.instance.cim = this.iratservice.cim;
        teteltorlesC.instance.eventTorles.pipe(untilComponentDestroyed(this)).subscribe(ok => {
          this.doTorles(ok);
        });
        break;
      case EgyMode.Modositas: // 3
        const C = this.vcr.createComponent(IratSzerkesztesComponent);

        C.instance.uj = false;
        C.instance.enUgyfel = this.enUgyfel;
        C.instance.DtoOriginal = this.Dto;
        C.instance.eventOk.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doModositaskesz(dto);
        });
        break;
      case EgyMode.Dokumentum: // 15
        const dokumentumlistC = this.vcr.createComponent(DokumentumListComponent);
        dokumentumlistC.instance.Iratkod = this.Dto.Iratkod;
        break;
      case EgyMode.Projekt: // 8
        const iratprojektjeC = this.vcr.createComponent(IratProjektjeComponent);
        iratprojektjeC.instance.item = this.Dto;
        break;
      case EgyMode.FotozasLink: // 16
        const fotozaslinkC = this.vcr.createComponent(FotozasLinkComponent);
        fotozaslinkC.instance.DtoOriginal = this.Dto;
        fotozaslinkC.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doFotozaslinkKesz(dto);
        });
        break;
      case EgyMode.VagolapIrathoz: // 41
        const vagolapirathozC = this.vcr.createComponent(VagolapIrathozComponent);
        vagolapirathozC.instance.item = this.Dto;
        break;
      case EgyMode.Levalasztas: // 52
        switch (this.LevalasztasMode) {
          case IratlevalasztasMode.Projektrol:
            const pklevalasztasC = this.vcr.createComponent(ProjektkapcsolatLevalasztasComponent);
            pklevalasztasC.instance.Dto = this.projektkapcsolatDto;
            pklevalasztasC.instance.eventLevalasztasutan.pipe(untilComponentDestroyed(this)).subscribe(ok => {
              this.doNav(0);
              if (ok) {
                this.eventLevalasztasutan.emit();
              }
            });
            this.docdr();
            break;
          case IratlevalasztasMode.Bizonylatrol:
            const bklevalasztasC = this.vcr.createComponent(BizonylatkapcsolatLevalasztasComponent);
            bklevalasztasC.instance.Dto = this.bizonylatkapcsolatDto;
            bklevalasztasC.instance.eventLevalasztasutan.pipe(untilComponentDestroyed(this)).subscribe(ok => {
              this.doNav(0);
              if (ok) {
                this.eventLevalasztasutan.emit();
              }
            });
            this.docdr();
            break;
        }
        break;
    }
  }

  doUjkesz(dto: IratDto) {
    this.eventUj.emit(dto);
  }

  async doTorles(ok: boolean) {
    if (ok) {
      this.spinner = true;
      try {
        const res = await this.iratservice.Delete(this.Dto);
        if (res.Error != null) {
          throw res.Error;
        }

        this.spinner = false;
        this.doNav(0);

        this.eventTorles.emit();
      } catch (err) {
        this.spinner = false;
        this._errorservice.Error = err;
      }
    } else {
      this.doNav(0);
    }
  }

  doModositaskesz(dto: IratDto) {
    if (dto !== undefined) {
      propCopy(dto, this.Dto);

      this.eventModositas.emit(dto);
    }
    this.doNav(0);
  }

  doFotozaslinkKesz(dto: IratDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto);

      this.eventModositas.emit(this.Dto);
    }
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {OnDestroyMixin, untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {CikkDto} from "../cikkdto";
import {deepCopy} from "../../../common/deepCopy";
import {ErrorService} from "../../../common/errorbox/error.service";
import {CikkService} from "../cikk.service";
import {propCopy} from "../../../common/propCopy";
import {TetelTorlesComponent} from "../../../common/tetel-torles/tetel-torles.component";
import {EgyMode} from "../../../common/enums/egymode";
import {ReszletekComponent} from "../../../common/reszletek/reszletek.component";
import {CikkSzerkesztesComponent} from "../cikk-szerkesztes/cikk-szerkesztes.component";
import {CikkBeszerzesKivetComponent} from "../cikk-beszerzes-kivet/cikk-beszerzes-kivet.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cikk-egy',
  templateUrl: './cikk-egy.component.html'
})
export class CikkEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_cikk', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() uj: boolean = false;
  @Input() defaultNav: number = 0;
  Dto = new CikkDto();
  @Input() set dto(value: CikkDto) {
    this.Dto = deepCopy(value);
  }
  @Output() eventUj: EventEmitter<CikkDto> = new EventEmitter<CikkDto>();
  @Output() eventTorles: EventEmitter<void> = new EventEmitter<void>();
  @Output() eventModositas: EventEmitter<CikkDto> = new EventEmitter<CikkDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  cikkservice: CikkService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              cikkservice: CikkService) {
    super();

    this.cikkservice = cikkservice;
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
        const ujC = this.vcr.createComponent(CikkSzerkesztesComponent);

        ujC.instance.uj = true;
        ujC.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doUjkesz(dto);
        });
        break;
      case EgyMode.Reszletek: // 1
        const reszletekC = this.vcr.createComponent(ReszletekComponent);

        reszletekC.instance.cim = this.cikkservice.cim;
        reszletekC.instance.item = this.Dto;
        reszletekC.instance.colsets = this.cikkservice.ReszletekSettings;
        break;
      case EgyMode.Torles: // 2
        const teteltorlesC = this.vcr.createComponent(TetelTorlesComponent);

        teteltorlesC.instance.cim = this.cikkservice.cim;
        teteltorlesC.instance.eventTorles.pipe(untilComponentDestroyed(this)).subscribe(ok => {
          this.doTorles(ok);
        });
        break;
      case EgyMode.Modositas: // 3
        const C = this.vcr.createComponent(CikkSzerkesztesComponent);

        C.instance.uj = false;
        C.instance.DtoOriginal = this.Dto;
        C.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doModositaskesz(dto);
        });
        break;
      case EgyMode.BeszerzesMozgas: // 28
        const beszerzesC = this.vcr.createComponent(CikkBeszerzesKivetComponent);
        beszerzesC.instance.Cikkkod = this.Dto.Cikkkod;
        beszerzesC.instance.BizonylattipusKod = 3;
        break;
      case EgyMode.KivetMozgas: // 29
        const kivetC = this.vcr.createComponent(CikkBeszerzesKivetComponent);
        kivetC.instance.Cikkkod = this.Dto.Cikkkod;
        kivetC.instance.BizonylattipusKod = 2;
        break;
    }
  }

  doUjkesz(dto: CikkDto) {
    this.eventUj.emit(dto);
  }

  async doTorles(ok: boolean) {
    if (ok) {
      this.spinner = true;
      try {
        const res = await this.cikkservice.Delete(this.Dto);
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

  doModositaskesz(dto: CikkDto) {
    if (dto !== undefined) {
      propCopy(dto, this.Dto);

      this.eventModositas.emit(dto);
    }
    this.doNav(0);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {UgyfelDto} from '../ugyfeldto';
import {deepCopy} from '../../../common/deepCopy';
import {UgyfelService} from '../ugyfel.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {propCopy} from '../../../common/propCopy';
import {UgyfelSzerkesztesComponent} from '../ugyfel-szerkesztes/ugyfel-szerkesztes.component';
import {TetelTorlesComponent} from '../../../common/tetel-torles/tetel-torles.component';
import {EgyMode} from '../../../common/enums/egymode';
import {ReszletekComponent} from '../../../common/reszletek/reszletek.component';
import {UgyfelCsoportComponent} from '../ugyfel-csoport/ugyfel-csoport.component';
import {UgyfelProjektComponent} from '../ugyfel-projekt/ugyfel-projekt.component';
import {UgyfelVcardComponent} from '../ugyfel-vcard/ugyfel-vcard.component';
import {UgyfelterLinkComponent} from '../ugyfelter-link/ugyfelter-link.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ugyfel-egy',
  templateUrl: './ugyfel-egy.component.html'
})
export class UgyfelEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_ugyfel', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() uj = false;
  @Input() defaultNav = 0;
  Dto = new UgyfelDto();
  @Input() set dto(value: UgyfelDto) {
    this.Dto = deepCopy(value);
  }
  @Output() eventUj: EventEmitter<UgyfelDto> = new EventEmitter<UgyfelDto>();
  @Output() eventTorles: EventEmitter<void> = new EventEmitter<void>();
  @Output() eventModositas: EventEmitter<UgyfelDto> = new EventEmitter<UgyfelDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  ugyfelservice: UgyfelService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              ugyfelservice: UgyfelService) {
    super();

    this.ugyfelservice = ugyfelservice;
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
        const ujC = this.vcr.createComponent(UgyfelSzerkesztesComponent);

        ujC.instance.uj = true;
        ujC.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doUjkesz(dto);
        });
        break;
      case EgyMode.Reszletek: // 1
        const reszletekC = this.vcr.createComponent(ReszletekComponent);

        reszletekC.instance.cim = this.ugyfelservice.cim;
        reszletekC.instance.item = this.Dto;
        reszletekC.instance.colsets = this.ugyfelservice.ReszletekSettings;
        break;
      case EgyMode.Torles: // 2
        const teteltorlesC = this.vcr.createComponent(TetelTorlesComponent);

        teteltorlesC.instance.cim = this.ugyfelservice.cim;
        teteltorlesC.instance.eventTorles.pipe(untilComponentDestroyed(this)).subscribe(ok => {
          this.doTorles(ok);
        });
        break;
      case EgyMode.Modositas: // 3
        const C = this.vcr.createComponent(UgyfelSzerkesztesComponent);

        C.instance.uj = false;
        C.instance.DtoOriginal = this.Dto;
        C.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doModositaskesz(dto);
        });
        break;
      case EgyMode.Csoport: // 7
        const ugyfelcsoportC = this.vcr.createComponent(UgyfelCsoportComponent);
        ugyfelcsoportC.instance.DtoOriginal = this.Dto;
        ugyfelcsoportC.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doModositaskesz(dto);
        });
        break;
      case EgyMode.Projekt: // 8
        const ugyfelprojektC = this.vcr.createComponent(UgyfelProjektComponent);
        ugyfelprojektC.instance.Ugyfelkod = this.Dto.Ugyfelkod;
        break;
      case EgyMode.UgyfelterLink: // 9
        const ugyfelterlinkC = this.vcr.createComponent(UgyfelterLinkComponent);
        ugyfelterlinkC.instance.DtoOriginal = this.Dto;
        ugyfelterlinkC.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doModositaskeszCsak(dto);
        });
        break;
      case EgyMode.Vcard: // 10
        const ugyfelvcardC = this.vcr.createComponent(UgyfelVcardComponent);
        ugyfelvcardC.instance.Dto = this.Dto;
        break;
    }
  }

  doUjkesz(dto: UgyfelDto) {
    this.eventUj.emit(dto);
  }

  async doTorles(ok: boolean) {
    if (ok) {
      this.spinner = true;
      try {
        const res = await this.ugyfelservice.Delete(this.Dto);
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

  doModositaskeszCsak(dto: UgyfelDto) {
    if (dto !== undefined) {
      propCopy(dto, this.Dto);

      this.eventModositas.emit(dto);
    }
  }
  doModositaskesz(dto: UgyfelDto) {
    this.doModositaskeszCsak(dto);
    this.doNav(0);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}

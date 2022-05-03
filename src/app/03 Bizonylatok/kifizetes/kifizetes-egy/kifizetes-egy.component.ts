import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {KifizetesDto} from '../kifizetesdto';
import {deepCopy} from '../../../common/deepCopy';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {EgyMode} from '../../../common/enums/egymode';
import {KifizetesService} from '../kifizetes.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {ReszletekComponent} from '../../../common/reszletek/reszletek.component';
import {TetelTorlesComponent} from '../../../common/tetel-torles/tetel-torles.component';
import {propCopy} from '../../../common/propCopy';
import {KifizetesSzerkesztesComponent} from '../kifizetes-szerkesztes/kifizetes-szerkesztes.component';
import {BizonylatDto} from '../../../bizonylat/bizonylatdto';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-kifizetes-egy',
  templateUrl: './kifizetes-egy.component.html'
})
export class KifizetesEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_kifizetes', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() uj = false;
  @Input() defaultNav = 0;
  Dto = new KifizetesDto();
  @Input() set dto(value: KifizetesDto) {
    this.Dto = deepCopy(value);
  }
  @Input() Bizonylat = new BizonylatDto();
  @Output() eventUj: EventEmitter<KifizetesDto> = new EventEmitter<KifizetesDto>();
  @Output() eventTorles: EventEmitter<void> = new EventEmitter<void>();
  @Output() eventModositas: EventEmitter<KifizetesDto> = new EventEmitter<KifizetesDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  kifizetesservice: KifizetesService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              kifizetesservice: KifizetesService) {
    super();

    this.kifizetesservice = kifizetesservice;
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
        const ujC = this.vcr.createComponent(KifizetesSzerkesztesComponent);

        ujC.instance.uj = true;
        ujC.instance.Bizonylat = this.Bizonylat;
        ujC.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doUjkesz(dto);
        });
        break;
      case EgyMode.Reszletek: // 1
        const reszletekC = this.vcr.createComponent(ReszletekComponent);

        reszletekC.instance.cim = this.kifizetesservice.cim;
        reszletekC.instance.item = this.Dto;
        reszletekC.instance.colsets = this.kifizetesservice.ReszletekSettings;
        break;
      case EgyMode.Torles: // 2
        const teteltorlesC = this.vcr.createComponent(TetelTorlesComponent);

        teteltorlesC.instance.cim = this.kifizetesservice.cim;
        teteltorlesC.instance.eventTorles.pipe(untilComponentDestroyed(this)).subscribe(ok => {
          this.doTorles(ok);
        });
        break;
      case EgyMode.Modositas: // 3
        const C = this.vcr.createComponent(KifizetesSzerkesztesComponent);

        C.instance.uj = false;
        C.instance.DtoOriginal = this.Dto;
        C.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doModositaskesz(dto);
        });
        break;
    }
  }

  doUjkesz(dto: KifizetesDto) {
    this.eventUj.emit(dto);
  }

  async doTorles(ok: boolean) {
    if (ok) {
      this.spinner = true;
      try {
        const res = await this.kifizetesservice.Delete(this.Dto);
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

  doModositaskesz(dto: KifizetesDto) {
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

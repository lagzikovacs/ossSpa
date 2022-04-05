import {
  AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef, EventEmitter,
  Output, ChangeDetectorRef, ChangeDetectionStrategy
} from '@angular/core';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {PenznemDto} from '../penznemdto';
import {deepCopy} from '../../../common/deepCopy';
import {ErrorService} from '../../../common/errorbox/error.service';
import {PenznemService} from '../penznem.service';
import {propCopy} from '../../../common/propCopy';
import {EgyMode} from '../../../common/enums/egymode';
import {ReszletekComponent} from '../../../common/reszletek/reszletek.component';
import {TetelTorlesComponent} from '../../../common/tetel-torles/tetel-torles.component';
import {PenznemSzerkesztesComponent} from '../penznem-szerkesztes/penznem-szerkesztes.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-penznem-egy',
  templateUrl: './penznem-egy.component.html'
})
export class PenznemEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_penznem', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() uj = false;
  @Input() defaultNav = 0;
  Dto = new PenznemDto();
  @Input() set dto(value: PenznemDto) {
    this.Dto = deepCopy(value);
  }
  @Output() eventUj: EventEmitter<PenznemDto> = new EventEmitter<PenznemDto>();
  @Output() eventTorles: EventEmitter<void> = new EventEmitter<void>();
  @Output() eventModositas: EventEmitter<PenznemDto> = new EventEmitter<PenznemDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  penznemservice: PenznemService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              penznemservice: PenznemService) {
    super();

    this.penznemservice = penznemservice;
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
        const ujC = this.vcr.createComponent(PenznemSzerkesztesComponent);

        ujC.instance.uj = true;
        ujC.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doUjkesz(dto);
        });
        break;
      case EgyMode.Reszletek: // 1
        const reszletekC = this.vcr.createComponent(ReszletekComponent);

        reszletekC.instance.cim = this.penznemservice.cim;
        reszletekC.instance.item = this.Dto;
        reszletekC.instance.colsets = this.penznemservice.ReszletekSettings;
        break;
      case EgyMode.Torles: // 2
        const teteltorlesC = this.vcr.createComponent(TetelTorlesComponent);

        teteltorlesC.instance.cim = this.penznemservice.cim;
        teteltorlesC.instance.eventTorles.pipe(untilComponentDestroyed(this)).subscribe(ok => {
          this.doTorles(ok);
        });
        break;
      case EgyMode.Modositas: // 3
        const C = this.vcr.createComponent(PenznemSzerkesztesComponent);

        C.instance.uj = false;
        C.instance.DtoOriginal = this.Dto;
        C.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doModositaskesz(dto);
        });
        break;
    }
  }

  doUjkesz(dto: PenznemDto) {
    this.eventUj.emit(dto);
  }

  async doTorles(ok: boolean) {
    if (ok) {
      this.spinner = true;
      try {
        const res = await this.penznemservice.Delete(this.Dto);
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

  doModositaskesz(dto: PenznemDto) {
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

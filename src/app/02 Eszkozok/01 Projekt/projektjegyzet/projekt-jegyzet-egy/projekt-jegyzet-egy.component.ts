import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy,
  OnInit, Output, ViewChild, ViewContainerRef
} from '@angular/core';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {ProjektjegyzetService} from '../projektjegyzet.service';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {ProjektjegyzetDto} from '../projektjegyzetdto';
import {deepCopy} from '../../../../common/deepCopy';
import {EgyMode} from '../../../../common/enums/egymode';
import {ReszletekComponent} from '../../../../common/reszletek/reszletek.component';
import {TetelTorlesComponent} from '../../../../common/tetel-torles/tetel-torles.component';
import {ProjektJegyzetSzerkesztesComponent} from '../projekt-jegyzet-szerkesztes/projekt-jegyzet-szerkesztes.component';
import {propCopy} from '../../../../common/propCopy';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projekt-jegyzet-egy',
  templateUrl: './projekt-jegyzet-egy.component.html'
})
export class ProjektJegyzetEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_projektjegyzet', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() uj = false;
  @Input() defaultNav = 0;
  Dto = new ProjektjegyzetDto();
  @Input() set dto(value: ProjektjegyzetDto) {
    this.Dto = deepCopy(value);
  }
  @Input() Projektkod = -1;
  @Output() eventUj: EventEmitter<ProjektjegyzetDto> = new EventEmitter<ProjektjegyzetDto>();
  @Output() eventTorles: EventEmitter<void> = new EventEmitter<void>();
  @Output() eventModositas: EventEmitter<ProjektjegyzetDto> = new EventEmitter<ProjektjegyzetDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  projektjegyzetservice: ProjektjegyzetService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              projektjegyzetservice: ProjektjegyzetService) {
    super();

    this.projektjegyzetservice = projektjegyzetservice;
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
        const ujC = this.vcr.createComponent(ProjektJegyzetSzerkesztesComponent);

        ujC.instance.uj = true;
        ujC.instance.Projektkod = this.Projektkod;
        ujC.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doUjkesz(dto);
        });
        break;
      case EgyMode.Reszletek: // 1
        const reszletekC = this.vcr.createComponent(ReszletekComponent);

        reszletekC.instance.cim = this.projektjegyzetservice.cim;
        reszletekC.instance.item = this.Dto;
        reszletekC.instance.colsets = this.projektjegyzetservice.ReszletekSettings;
        break;
      case EgyMode.Torles: // 2
        const teteltorlesC = this.vcr.createComponent(TetelTorlesComponent);

        teteltorlesC.instance.cim = this.projektjegyzetservice.cim;
        teteltorlesC.instance.eventTorles.pipe(untilComponentDestroyed(this)).subscribe(ok => {
          this.doTorles(ok);
        });
        break;
      case EgyMode.Modositas: // 3
        const C = this.vcr.createComponent(ProjektJegyzetSzerkesztesComponent);

        C.instance.uj = false;
        C.instance.DtoOriginal = this.Dto;
        C.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doModositaskesz(dto);
        });
        break;
    }
  }

  doUjkesz(dto: ProjektjegyzetDto) {
    this.eventUj.emit(dto);
  }

  async doTorles(ok: boolean) {
    if (ok) {
      this.spinner = true;
      try {
        const res = await this.projektjegyzetservice.Delete(this.Dto);
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

  doModositaskesz(dto: ProjektjegyzetDto) {
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
